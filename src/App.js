import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  Edge,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';
import './style.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  //background
  const [variant, setVariant] = useState('Lines');

  //update Node 
  const [editValue, setEditValue] = useState(nodes.data)
  const [id, setId] = useState()

  //edit function
  const onNodeClick = (e, val) => {
    setShowSidebar(true)
    setEditValue(val.data.label)
    setId(val.id)

  }
  //handle Change
  const handleChange = (e) => {
    e.preventDefault();
    setEditValue(e.target.value);
  }
  const hasMultipleNodesWithEmptyTargetHandles = (nodesData) => {
    // Count the number of nodes with empty target handles
    let emptyTargetHandleCount = 0;
    for (const node of nodesData.nodes) {
      if (!node.targetHandle) {
        emptyTargetHandleCount++;
      }
    }

    // Check if there are more than one nodes with empty target handles
    return emptyTargetHandleCount > 1;
  };

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      const hasMultipleEmptyTargetHandles =
        hasMultipleNodesWithEmptyTargetHandles(flow);

      // Display error message if condition is met
      if (flow.nodes.length > 1 && hasMultipleEmptyTargetHandles) {
        alert("Error: More than one node has empty target handles.");
      } else {
        localStorage.setItem("flowKey", JSON.stringify(flow));
      }
    }
  }, [reactFlowInstance]);
  //handle Function
  const handleEdit = () => {
    setShowSidebar(false)
    const res = nodes.map((item) => {
      if (item.id === id) {
        item.data = {
          ...item.data,
          label: editValue
        }
      }
      return item
    })
    setNodes(res)
    setEditValue('')
  }

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow">

      <div className="updatenode__controls">
        {!showSidebar &&
          <div>
            <button className='save-button' onClick={onSave} >Save</button>
          </div>
        }
        {showSidebar ?
          <div className='updatenode__controls'>
            <label>Message:</label><br />
            <input type="text" value={editValue} onChange={handleChange} /> <br />
            <button onClick={handleEdit} className="btn">Update</button>
          </div>
          : <Sidebar />
        }
      </div>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow

            nodes={nodes}
            edges={edges}
            onNodeClick={(e, val) => onNodeClick(e, val)}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background color="#99b3ec" variant={variant} />
            <Controls />
          </ReactFlow>
        </div>

      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;