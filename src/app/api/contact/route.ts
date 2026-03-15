import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        if (!name || !phone) {
            return NextResponse.json(
                { error: "Name and Phone number are required fields" },
                { status: 400 }
            );
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return NextResponse.json(
                { error: "Phone number must be exactly 10 digits" },
                { status: 400 }
            );
        }

        const emailJsPayload = {
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            accessToken: process.env.EMAILJS_PRIVATE_KEY,
            template_params: {
                name: name,
                email: email || "Not provided",
                phone: phone,
                message: message || "No message provided",
            },
        };

        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(emailJsPayload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("EmailJS Error:", errorText);
            return NextResponse.json(
                { error: "Failed to send email via EmailJS" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Email sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
