import { ButtonProps } from "@mui/material";
import React, { ChangeEvent, ElementType } from "react";

export type HtmlMouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type HtmlMouseEventHandler = (e: HtmlMouseEvent) => void;

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;
export type InputChangeEventHandler = (event: InputChangeEvent) => void;

export type ButtonElement = ButtonProps<ElementType<any>>;