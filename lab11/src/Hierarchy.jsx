import React from "react";
import { ErrorBoundary } from 'react-error-boundary'
import HierarchyFallback from "./HierarchyFallback";
import HierarchyNode from "./HierarchyNode";



function Hierarchy(props) {
    if (props.childs && props.childs.length) {
        props.childs.forEach(element => {
            let res = props.childs.filter(n => n.id === element.id);
            if (res.length > 1) {
                throw new Error("childs have same id`s");
            }
        });
    }

    return (
        <div style={{ marginLeft: (!!!props.id ? "0px" : "18px") }}>
            {props.childs && props.childs.length  ? props.childs.map((elem) => (
                <ErrorBoundary FallbackComponent={HierarchyFallback} key={elem.id}>
                    <HierarchyNode key={elem.id} id={elem.id} name={elem.name} icon={elem.icon} childs={elem.childs} onClick={elem.onClick} />
                </ErrorBoundary>
            )) : null}
        </div>
    );
}

export default Hierarchy;
