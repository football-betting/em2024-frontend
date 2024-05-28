import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect}) => {
    const formData = await request.formData();

    const email = formData.get("email")?.toString();
    const origin = request.headers.get('origin');

    try {
        const actionCodeSettings = {
            url: origin + '/admin/login',
        }

        // await sendPasswordResetEmail(auth, email, actionCodeSettings);
    } catch (error: any) {
        // sendPasswordResetEmail does not throw an error if email does not exist
        // if (error.message.includes('Unable to create the email action link')) {
        //     return new Response('Email existiert nicht', {
        //         status: 200,
        //     });
        // }
        //
        // return new Response('Ein Fehler ist aufgetreten', {
        //     status: 200,
        // });
    }

    return redirect('/admin/login');
};
