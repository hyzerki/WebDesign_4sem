import React from "react"

function HierarchyFallback({ error }) {
    return (
        <div>
            {error.message}
        </div>
    )
}

export default HierarchyFallback;