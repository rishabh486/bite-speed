import React from "react";

const Sidebar = () => {
    const onDragStart = (event, nodeType, label) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside>
            <div
                className="dndnode input"
                onDragStart={(event) => onDragStart(event, "textUpdater")}
                draggable
                style={{
                    width: '150px',
                    height: '50px'
                }}
            >
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                >
                    Message Box
                </div>

            </div>
            {/* <div
                className="dndnode"
                onDragStart={(event) => onDragStart(event, "default")}
                draggable
            >
                Default Node
            </div>
            <div
                className="dndnode output"
                onDragStart={(event) => onDragStart(event, "output")}
                draggable
            >
                Output Node
            </div> */}
        </aside>
    );
};
export default Sidebar;
