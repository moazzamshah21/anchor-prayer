import React from "react";

export const navigationRef = React.createRef();

export function navigate(name, { ...props }) {
    navigationRef.current?.navigate(name, { ...props });
}