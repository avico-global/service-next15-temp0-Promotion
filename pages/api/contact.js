import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ 
      success: false,
      message: "Method not allowed",
      method: req.method 
    });
  }

  try {
    const { first_name, last_name, email, phone, message } = req.body;

    // Validate required fields
    if (!email || !first_name) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: email and first_name are required",
        receivedData: { first_name, last_name, email, phone }
      });
    }

    // Get the host from headers or use the domain directly
    let host = req.headers.host;
    // Clean the host by removing www. and https://
    host = host.replace(/^www\./, "").replace(/^https?:\/\//, "");

    const requestData = {
      first_name,
      last_name,
      email,
      phone,
      message,
      domain_name: host,
    };

    console.log("Making request to external API:", {
      url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/contact_us`,
      data: requestData
    });

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/contact_us`,
      data: requestData,
      timeout: 10000, // 10 second timeout
    };

    const response = await axios.request(config);
    
    console.log("External API response:", response.status, response.data);
    
    res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
      data: response.data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Contact form error:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url
    });

    // Return detailed error information
    const errorResponse = {
      success: false,
      message: error.response?.data?.message || error.message || "An error occurred",
      errorDetails: {
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        timeout: error.code === 'ECONNABORTED' ? true : false
      },
      timestamp: new Date().toISOString()
    };

    // If it's a network error or external API error, include more details
    if (error.response) {
      errorResponse.externalApiError = {
        status: error.response.status,
        data: error.response.data
      };
    }

    res.status(error.response?.status || 500).json(errorResponse);
  }
}
