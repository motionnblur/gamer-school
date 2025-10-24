import Button from "@mui/material/Button";
import React, { useState } from "react";
import { pathObj } from "../data/pathData";

function PathSelector() {
  const [selectedPaths, setSelectedPaths] = useState(new Set());
  const [selectedMasters, setSelectedMasters] = useState(new Set());
  const [nextStep, setNextStep] = useState(false);

  /**
   * Toggles the selection state of a path based on its ID.
   * @param {string} pathId - The unique ID of the path to toggle.
   */
  const togglePath = (pathId) => {
    const newSelectedPaths = new Set(selectedPaths);

    if (newSelectedPaths.has(pathId)) {
      newSelectedPaths.delete(pathId);
      pathObj.selectedPaths = pathObj.selectedPaths.filter(
        (p) => p.id !== pathId
      );
    } else {
      newSelectedPaths.add(pathId);
      pathObj.selectedPaths.push(
        pathObj.initialPaths.find((p) => p.id === pathId)
      );
    }

    setSelectedPaths(newSelectedPaths);
  };

  const toggleMaster = (masterId) => {
    const newSelectedMasters = new Set(selectedMasters);

    if (newSelectedMasters.has(masterId)) {
      newSelectedMasters.delete(masterId);
    } else {
      newSelectedMasters.add(masterId);
    }

    setSelectedMasters(newSelectedMasters);
  };

  const handleNext = () => {
    setNextStep(true);
  };

  const PathRenderer = () => {
    return (
      <div style={styles.container}>
        <h2 style={{ color: "black" }}>Choose Your Interests 🗺️</h2>
        <p style={styles.instructions}>
          Select all the paths that interest you.
        </p>

        <div style={styles.pathGrid}>
          {pathObj.initialPaths.map((path) => {
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
                  .map(
                    (id) => pathObj.initialPaths.find((p) => p.id === id).name
                  )
                  .join(" | ")
              : "No paths selected yet."}
          </p>
        </div>

        {/* ✅ Next Button Section */}
        <div style={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleNext}
            disabled={selectedPaths.size === 0}
          >
            Next →
          </Button>
        </div>
      </div>
    );
  };

  const MasterRenderer = () => {
    const allMasters: any = pathObj.selectedPaths.flatMap(
      (path) => path.masters
    );

    // 2. Filter for unique masters to avoid duplicates
    const uniqueMasters = allMasters.reduce((acc: any, master: any) => {
      if (!acc.some((m: any) => m.id === master.id)) {
        acc.push(master);
      }
      return acc;
    }, []);

    return (
      <div style={styles.container}>
        <h2 style={{ color: "black" }}>Select a master 🗺️</h2>
        <p style={styles.instructions}>Select your masters.</p>

        <div style={styles.pathGrid}>
          {uniqueMasters.map((master) => {
            const isSelected = selectedMasters.has(master.id);

            return (
              <div
                key={master.id}
                onClick={() => toggleMaster(master.id)}
                style={{
                  ...styles.pathCard,
                  ...(isSelected ? styles.selected : styles.unselected),
                }}
              >
                <h3 style={styles.pathName}>{master.name}</h3>
                <p style={styles.pathDescription}>{master.description}</p>
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
                  .map(
                    (id) => pathObj.initialPaths.find((p) => p.id === id).name
                  )
                  .join(" | ")
              : "No paths selected yet."}
          </p>
        </div>

        {/* ✅ Next Button Section */}
        <div style={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleNext}
            disabled={selectedPaths.size === 0}
          >
            Next →
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: 0,
        margin: 0,
      }}
    >
      {!nextStep ? <PathRenderer /> : <MasterRenderer />}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    boxSizing: "border-box",
    padding: "20px",
    marginTop: "20px",
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
    height: "64px",
    display: "flex",
    alignItems: "center",
  },
  buttonContainer: {
    textAlign: "right",
    marginTop: "20px",
  },
  nextButton: {
    backgroundColor: "#1890ff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "1em",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
};

export default PathSelector;
