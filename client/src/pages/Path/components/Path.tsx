import React, { useState } from "react";

const initialPaths = [
  {
    id: "moba",
    name: "Moba",
    description: "Coding, algorithms, and system design.",
  },
  {
    id: "fps",
    name: "Fps / Shooter",
    description: "Machine learning, statistics, and big data analysis.",
  },
  {
    id: "mmo",
    name: "Mmo",
    description: "User interfaces, user experience, and visual aesthetics.",
  },
  {
    id: "strategy",
    name: "Strategy",
    description: "Investing, budgeting, and financial planning.",
  },
  {
    id: "racing",
    name: "Racing",
    description: "Video games, streaming, and competitive gaming.",
  },
];

function PathSelector() {
  const [selectedPaths, setSelectedPaths] = useState(new Set());

  /**
   * Toggles the selection state of a path based on its ID.
   * @param {string} pathId - The unique ID of the path to toggle.
   */
  const togglePath = (pathId: string) => {
    const newSelectedPaths = new Set(selectedPaths);

    if (newSelectedPaths.has(pathId)) {
      newSelectedPaths.delete(pathId);
    } else {
      newSelectedPaths.add(pathId);
    }

    setSelectedPaths(newSelectedPaths);
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: "black" }}>Choose Your Interests 🗺️</h2>
      <p style={styles.instructions}>Select all the paths that interest you.</p>

      <div style={styles.pathGrid}>
        {initialPaths.map((path) => {
          const isSelected = selectedPaths.has(path.id);

          return (
            <div
              key={path.id}
              onClick={() => togglePath(path.id)}
              style={{
                ...styles.pathCard,
                ...(isSelected ? styles.selected : styles.unselected),
              }}
            >
              <h3 style={styles.pathName}>{path.name}</h3>
              <p style={styles.pathDescription}>{path.description}</p>
            </div>
          );
        })}
      </div>

      <hr style={styles.divider} />

      {/* Display the final selection */}
      <div style={styles.summary}>
        <p style={{ color: "black" }}>
          {selectedPaths.size > 0
            ? [...selectedPaths]
                .map((id) => initialPaths.find((p) => p.id === id).name)
                .join(" | ")
            : "No paths selected yet."}
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "10px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  instructions: {
    color: "#666",
    marginBottom: "25px",
    borderBottom: "1px solid #eee",
    paddingBottom: "15px",
  },
  pathGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "14px",
  },
  pathCard: {
    padding: "14px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  unselected: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    "&:hover": {
      borderColor: "#aaa",
    },
  },
  selected: {
    backgroundColor: "#e6f7ff", // Light blue background
    borderColor: "#91d5ff", // Blue border
    boxShadow: "0 0 8px rgba(24, 144, 255, 0.3)",
  },
  pathName: {
    marginTop: "0",
    marginBottom: "0",
    fontSize: "1.2em",
    color: "#333",
  },
  pathDescription: {
    fontSize: "0.86em",
    color: "#666",
    flexGrow: "1",
    marginBottom: "10px",
  },
  statusBadge: {
    alignSelf: "flex-end",
    fontSize: "0.8em",
    fontWeight: "bold",
    color: "#1890ff",
  },
  divider: {
    margin: "20px 0",
    border: "0",
    borderTop: "1px solid #eee",
  },
  summary: {
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
};

export default PathSelector;
