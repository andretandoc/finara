// Handle requests for managing budgets

import { PrismaClient } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function POST({ request }: RequestEvent): Promise<Response> {
	try {
		// Define the expected structure of the incoming data
		const data: {
			week: number;
			totalSpent: number;
			userId: number;
			categories: Array<{ name: string; limit: number; spent: number }>;
		} = await request.json();

		const budget = await prisma.budget.create({
			data: {
				week: data.week,
				totalSpent: data.totalSpent,
				userId: data.userId, // Authentication can be added later
				categories: {
					create: data.categories // Assuming data.categories is an array of category objects
				}
			}
		});

		return new Response(JSON.stringify(budget), { status: 201 });
	} catch (error) {
		if (error instanceof Error) {
			return new Response(JSON.stringify({ error: error.message }), { status: 500 });
		} else {
			return new Response(JSON.stringify({ error: 'An unknown error occurred' }), { status: 500 });
		}
	} finally {
		// Close the PrismaClient connection when done
		await prisma.$disconnect();
	}
}
