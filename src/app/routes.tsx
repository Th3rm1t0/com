import type { RouteObject } from "react-router-dom";
import { Top } from "@/pages/Top";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <Top />,
	},
];
