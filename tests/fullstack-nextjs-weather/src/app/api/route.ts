import { type NextRequest, NextResponse } from "next/server";

interface ExampleWeatherData {
	location: string;
	temperature: number;
	description: string;
	humidity: number;
	windSpeed: number;
	icon: string;
}

export async function GET(request: NextRequest) {}

export async function POST(request: NextRequest) {}
