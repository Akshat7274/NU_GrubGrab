import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacy.jpg"
            alt="contactus"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-4" style={{fontWeight:"lighter", fontFamily:"sans-serif", marginTop:"20px"}}>
          <p>We take your privacy seriously and are committed to protecting your personal information. This privacy policy explains how we collect, use, and protect your personal information when you use our website to order food.</p>
          <p>You have the right to access, correct, or delete your personal information at any time. You can also choose to opt-out of receiving promotional messages from us by following the unsubscribe instructions included in those messages.</p>
          <p>We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting a prominent notice on our website or by sending you an email.</p>
          <p>If you have any questions or concerns about our privacy policy, please contact us at nugrubgrab@gmail.com.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
