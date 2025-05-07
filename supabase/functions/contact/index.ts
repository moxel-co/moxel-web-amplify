import { createClient } from 'npm:@supabase/supabase-js@2.39.8'
import nodemailer from 'npm:nodemailer@6.9.9'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

async function sendEmail(name: string, email: string, message: string) {
  // Verify SMTP environment variables
  const smtpConfig = {
    host: Deno.env.get('SMTP_HOSTNAME'),
    port: Deno.env.get('SMTP_PORT'),
    username: Deno.env.get('SMTP_USERNAME'),
    password: Deno.env.get('SMTP_PASSWORD'),
    from: Deno.env.get('SMTP_FROM'),
  }

  // Check if any SMTP config is missing
  const missingConfig = Object.entries(smtpConfig).filter(([_, value]) => !value)
  if (missingConfig.length > 0) {
    throw new Error(`Missing SMTP configuration: ${missingConfig.map(([key]) => key).join(', ')}`)
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: parseInt(smtpConfig.port!),
    secure: false,
    auth: {
      user: smtpConfig.username,
      pass: smtpConfig.password,
    },
  })

  const to = "app@moxel.co"
  const subject = `New Contact Form Submission from ${name}`
  const body = `
Name: ${name}
Email: ${email}
Message: ${message}
  `

  try {
    await transporter.sendMail({
      from: smtpConfig.from,
      to,
      subject,
      text: body,
    })
  } catch (error) {
    console.error('SMTP Error:', error)
    throw new Error(`Failed to send email: ${error.message}`)
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    })
  }

  try {
    // Validate request method
    if (req.method !== 'POST') {
      throw new Error('Method not allowed')
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Parse request body
    let body
    try {
      body = await req.json()
    } catch (e) {
      throw new Error('Invalid JSON payload')
    }

    const { name, email, message } = body

    // Validate input
    if (!name || !email || !message) {
      throw new Error('Name, email, and message are required')
    }

    // Store in database
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert([{ name, email, message }])

    if (dbError) throw dbError

    // Send email notification
    await sendEmail(name, email, message)

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Function Error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'An unexpected error occurred' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.status || 400,
      },
    )
  }
})