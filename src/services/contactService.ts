// src/services/contactService.ts

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

class ContactService {
  private readonly endpoint: string;

  constructor() {
    // FormSubmit endpoint with hashed email
    this.endpoint =
      "https://formsubmit.co/ajax/216dcd6ead04c9bb6106b780213fff17";
  }

  /**
   * Send contact form data to FormSubmit service
   * @param formData - The contact form data
   * @returns Promise with success status and message
   */
  async sendContactForm(formData: ContactFormData): Promise<ContactResponse> {
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };

      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        success: data.success || true,
        message: data.message || "Message sent successfully!",
      };
    } catch (error) {
      console.error("Error sending contact form:", error);

      return {
        success: false,
        message:
          "Failed to send message. Please try again or contact directly via email.",
      };
    }
  }

  /**
   * Validate contact form data
   * @param formData - The contact form data to validate
   * @returns Object with validation results
   */
  validateFormData(formData: ContactFormData): {
    isValid: boolean;
    errors: Partial<Record<keyof ContactFormData, string>>;
  } {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!this.isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Validate email format using regex
   * @param email - Email string to validate
   * @returns boolean indicating if email is valid
   */
  private isValidEmail(email: string): boolean {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }
}

// Export singleton instance
export const contactService = new ContactService();
export default contactService;
