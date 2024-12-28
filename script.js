// Representasi graf
const graph = {
    "Halte A": { "Halte B": 1000, "Halte D": 3000 },
    "Halte B": { "Halte A": 1000, "Halte C": 500, "Halte E": 2500 },
    "Halte C": { "Halte B": 500, "Halte D": 1500 },
    "Halte D": { "Halte C": 1500, "Halte E": 1000, "Halte A": 3000 },
    "Halte E": { "Halte B": 2500, "Halte D": 1000 }
};

// Algoritma DFS
function dfs(graph, start, goal, visited = new Set()) {
    if (start === goal) return [start];
    visited.add(start);

    for (let neighbor in graph[start]) {
        if (!visited.has(neighbor)) {
            const path = dfs(graph, neighbor, goal, visited);
            if (path) return [start, ...path];
        }
    }
    return null;
}

// Algoritma BFS
function bfs(graph, start, goal) {
    const queue = [[start]];
    const visited = new Set();

    while (queue.length > 0) {
        const path = queue.shift();
        const node = path[path.length - 1];

        if (node === goal) return path;
        if (!visited.has(node)) {
            visited.add(node);
            for (let neighbor in graph[node]) {
                queue.push([...path, neighbor]);
            }
        }
    }
    return null;
}

// Algoritma Dijkstra
function dijkstra(graph, start, goal) {
    const distances = {};
    const previous = {};
    const queue = [];

    for (let node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
        queue.push(node);
    }

    distances[start] = 0;

    while (queue.length > 0) {
        queue.sort((a, b) => distances[a] - distances[b]);
        const current = queue.shift();

        if (current === goal) {
            const path = [];
            let temp = goal;
            while (temp) {
                path.unshift(temp);
                temp = previous[temp];
            }
            return { path, distance: distances[goal] };
        }

        for (let neighbor in graph[current]) {
            const alt = distances[current] + graph[current][neighbor];
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previous[neighbor] = current;
            }
        }
    }

    return { path: null, distance: Infinity };
}

// Mengatur event form
document.getElementById("route-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const source = document.getElementById("source").value;
    const target = document.getElementById("target").value;
    const algorithm = document.getElementById("algorithm").value;

    let result;
    if (algorithm === "DFS") {
        result = dfs(graph, source, target);
        result = result ? `Rute (DFS): ${result.join(" -> ")}` : "Tidak ada rute.";
    } else if (algorithm === "BFS") {
        result = bfs(graph, source, target);
        result = result ? `Rute (BFS): ${result.join(" -> ")}` : "Tidak ada rute.";
    } else if (algorithm === "Dijkstra") {
        const { path, distance } = dijkstra(graph, source, target);
        result = path ? `Rute (Dijkstra): ${path.join(" -> ")} - Jarak: ${distance} meter` : "Tidak ada rute.";
    }

    document.getElementById("result").textContent = result;
});
