import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className="text-updater-node" style={{ border: '1px solid black' }}>
            <Handle type="source" position={Position.Left} isConnectable={isConnectable} />
            <div>
                <div className="message-heading">New Message</div>
                <div className="input-area">
                    <input id="text" name="text" value={data.label} onChange={onChange} className="nodrag" />
                </div>
            </div>
            <Handle type="target" position={Position.Right} isConnectable={isConnectable} />
            {/* <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={handleStyle}
                isConnectable={isConnectable}
            />
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} /> */}
        </div>
    );
}

export default TextUpdaterNode;
