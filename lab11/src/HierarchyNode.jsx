import React from "react";
import { ErrorBoundary } from 'react-error-boundary'
import HierarchyFallback from "./HierarchyFallback";



function HierarchyNode(props) {

    const [folded, setFolded] = React.useState(!!!props.id);
    function clickHandle() {
        setFolded(!folded);
        if (props.onClick)
            props.onClick(props.id);
    }

    if (props.onClick !== undefined && typeof props.onClick !== "function") {
        throw new Error("onClick is not a function");
    }
    if (props.childs && props.childs.length && folded) {
        props.childs.forEach(element => {
            let res = props.childs.filter(n => n.id === element.id);
            if (res.length > 1) {
                throw new Error("childs have same id's");
            }
        });
    }

    return (
        <div style={{ marginLeft: (!!!props.id ? "0px" : "18px") }}>
            {props.name && props.id && props.icon ?
                <div style={{ display: "flex" }} onClick={clickHandle}>
                    {props.childs && props.childs.length ? <img src={folded ? "/icons/upArrow.svg" : "/icons/downArrow.svg"} height="18px" width="18px" alt="foldArrow" /> : null}
                    <img src={props.icon} height="18px" width="18px" alt={props.icon} />
                    <div>{props.name}</div>
                </div> : null
            }
            {props.childs && props.childs.length && folded ? props.childs.map((elem) => (
                <ErrorBoundary FallbackComponent={HierarchyFallback} key={elem.id}>
                    <HierarchyNode  id={elem.id} name={elem.name} icon={elem.icon} childs={elem.childs} onClick={elem.onClick} />
                </ErrorBoundary>
            )) : null}
        </div>
    );
}

export default HierarchyNode;