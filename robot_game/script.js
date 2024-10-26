const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin", "Alice's House-Post Office",
    "Bob's House-Town Hall", "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop", "Marketplace-Town Hall", 
    "Shop-Town Hall"
];

function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (!graph[from]) graph[from] = [to];
        else graph[from].push(to);
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const villageGraph = buildGraph(roads);

const villagePlaces = [
    { name: "Alice's House", x: 1, y: 1 },
    { name: "Bob's House", x: 3, y: 1 },
    { name: "Cabin", x: 0, y: 2 },
    { name: "Post Office", x: 2, y: 3 },
    { name: "Town Hall", x: 3, y: 3 },
    { name: "Daria's House", x: 1, y: 4 },
    { name: "Ernie's House", x: 2, y: 4 },
    { name: "Grete's House", x: 3, y: 4 },
    { name: "Farm", x: 4, y: 2 },
    { name: "Shop", x: 4, y: 3 },
    { name: "Marketplace", x: 2, y: 2 }
];

function displayVillageMap() {
    const map = document.getElementById('villageMap');
    map.innerHTML = ''; 
    
    villagePlaces.forEach(place => {
        const placeDiv = document.createElement('div');
        placeDiv.className = 'place';
        placeDiv.style.gridColumn = place.x + 1;
        placeDiv.style.gridRow = place.y + 1;
        placeDiv.innerText = place.name;
        map.appendChild(placeDiv);
    });
}

displayVillageMap();

class Parcel {
    constructor(place, address) {
        this.place = place;
        this.address = address;
    }
}

class Robot {
    constructor(startPlace, parcels = []) {
        this.currentPlace = startPlace;
        this.parcels = parcels;
    }

    move() {
        if (this.parcels.length > 0) {
            let parcel = this.parcels[0];
            if (this.currentPlace === parcel.address) {
                console.log(`Delivered parcel to ${this.currentPlace}`);
                this.parcels.shift(); 
            }
        }
        let possibleDestinations = villageGraph[this.currentPlace];
        let randomDestination = possibleDestinations[Math.floor(Math.random() * possibleDestinations.length)];
        this.currentPlace = randomDestination;
        console.log(`Robot moved to ${this.currentPlace}`);
        return this.currentPlace;
    }

    displayParcelInfo() {
        let info = this.parcels.map(parcel => `Parcel to: ${parcel.address}`).join(', ');
        if (!info) info = 'No parcels left';
        document.getElementById('parcelInfo').innerText = `Current Location: ${this.currentPlace}\n${info}`;
    }
}

function createParcels() {
    return [
        new Parcel("Post Office", "Bob's House"),
        new Parcel("Marketplace", "Grete's House")
    ];
}

let robot = new Robot("Alice's House", createParcels());

function restartGame() {
    robot = new Robot("Alice's House", createParcels());
    robot.displayParcelInfo();
    highlightPlace(robot.currentPlace);
    document.getElementById('restartGame').style.display = 'none';  
}

document.getElementById('startSimulation').addEventListener('click', () => {
    const interval = setInterval(() => {
        let newPlace = robot.move();
        robot.displayParcelInfo();
        highlightPlace(newPlace);
        if (robot.parcels.length === 0) {
            clearInterval(interval);
            alert("All parcels delivered!");
            document.getElementById('restartGame').style.display = 'block';  
        }
    }, 1000);
});

document.getElementById('manualMove').addEventListener('click', () => {
    let newPlace = robot.move();
    robot.displayParcelInfo();
    highlightPlace(newPlace);
});

document.getElementById('restartGame').addEventListener('click', () => {
    restartGame();  
});

function highlightPlace(placeName) {
    let allPlaces = document.querySelectorAll('.place');
    allPlaces.forEach(place => {
        place.classList.remove('robot');
        if (place.innerText === placeName) {
            place.classList.add('robot');
        }
    });
}


robot.displayParcelInfo();
highlightPlace(robot.currentPlace);
