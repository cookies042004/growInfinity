import React from "react";
import "./PrivacyPolicy.css";
import { Layout } from "../../components/Layout";

export const PrivacyPolicy = () => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
        className="privacybanner"
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)" }}
        >
          <div
            style={{
              gridColumn: "span 12",
              textAlign: "center",
              marginTop: "5rem",
            }}
          >
            <h1
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "600",
                color: "white",
                fontSize: "2rem",
                textTransform: "capitalize",
              }}
            >
              Privacy Policy
            </h1>
          </div>
        </div>
      </div>

      {/* Privacy Content */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          padding: "2rem 1.5rem",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <div
          style={{
            textAlign: "justify",
            fontSize: "1rem",
            lineHeight: "1.8",
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            color: "#444",
          }}
        >
          <p>
            This Privacy policy is subject to the terms of this website's Site
            Policy (User Agreement). The personal information provided by the
            users to us will not be provided to third parties without previous
            consent of the concerned user.
          </p>

          <p>
            Every effort shall be made to keep the information provided by the
            users in a safe manner. The information displayed on the website
            will be done so only after obtaining consent from the users.
          </p>

          <p>
            In order to provide a personalized browsing experience, we may
            collect personal information from you. Also, we may require you to
            complete a registration form or ask for some information regarding
            the property you are looking for.
          </p>

          <p
            style={{
              background: "#f9f9f9",
              padding: "1.5rem",
              borderLeft: "5px solid #ff6f61",
              borderRadius: "5px",
              fontStyle: "italic",
              color: "#555",
            }}
          >
            "To extend this personalized experience, we may track the IP address
            of a user’s device and save certain information in the form of
            cookies."
          </p>

          <p>
            GROW INFINITY REALTORS has taken all reasonable steps to ensure that
            all the information on this website is authentic. Users are advised
            to research independently before making any transactions.
          </p>
        </div>

        {/* Contact Box */}
        <div
          style={{
            marginTop: "2rem",
            padding: "2rem",
            backgroundColor: "#1f2937",
            color: "white",
            textAlign: "center",
            borderRadius: "8px",
            boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
            maxWidth: "500px",
            margin: "2rem auto",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h3
            style={{
              fontSize: "1.7rem",
              fontWeight: "700",
              marginBottom: "1rem",
              letterSpacing: "0.5px",
            }}
          >
            Need Assistance?
          </h3>

          {/* Email Link */}
          <a
            href="mailto:growinfinityrealtor1@gmail.com"
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#ff6f61",
              textDecoration: "none",
              display: "block",
              marginBottom: "0.5rem",
              transition: "color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.color = "#ff4433")}
            onMouseOut={(e) => (e.target.style.color = "#ff6f61")}
          >
            📧 Email: growinfinityrealtor1@gmail.com,
          </a>

          <a
            href="mailto:info@growinfinityrealtors.in"
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#ff6f61",
              textDecoration: "none",
              display: "block",
              marginBottom: "0.5rem",
              transition: "color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.color = "#ff4433")}
            onMouseOut={(e) => (e.target.style.color = "#ff6f61")}
          >
            info@growinfinityrealtors.in
          </a>

          {/* Contact Number */}
          <a
            href="tel:+91-9990052554"
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#4ade80",
              textDecoration: "none",
              display: "block",
              transition: "color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.color = "#22c55e")}
            onMouseOut={(e) => (e.target.style.color = "#4ade80")}
          >
            📞 Call: +91-9990052554
          </a>
        </div>
      </div>
    </Layout>
  );
};
