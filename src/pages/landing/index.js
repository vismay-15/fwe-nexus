import React from "react";
import "./style.css";
import { SectionTitle } from "../../components/SectionTitle";
import { Text } from "../../components/Text";
import { PageTitle } from "../../components/PageTitle";
import { SectionInnerTitle } from "../../components/SectionInnerTitle";
import ewfNexus from "../../assets/images/fwe-nexus.jpg";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <>
      <section
        className="title-section py-5 cover-img d-flex align-items-center justify-content-center"
        style={{
          backgroundImage:
            'url("https://futureearth.org/wp-content/uploads/2019/03/fe-web-kans-header-nexus-1024x267.jpg")',
        }}
      >
        <div className="cover-content fc-white text-center">
          <PageTitle className="mb-4">Water Energy Food Nexus</PageTitle>
          <Text className="fc-white fs-20px">
            Driving sustainable integration of water, energy, and food systems
            through innovation, collaboration, and actionable insights to
            empower communities and build a resilient future for all.
          </Text>
        </div>
      </section>
      <section className="summary-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-7">
              <SectionTitle>
                Addressing the interconnected demands of water, energy and food
                systems is critical to achieving a balanced and resilient future
                for communities worldwide.
              </SectionTitle>
              <Text className="text-justify">
                The Water-Energy-Food (WEF) Nexus method is a significant
                paradigm for solving the linked difficulties of resource
                organization in the modern world. The nexus comprehends that
                water stock, energy generation and food production are all
                interrelated systems, and any actions or policies impacting one
                would positively influence the others.
              </Text>
              <Text className="text-justify">
                Abundant efforts and programs have been launched across EU to
                address the nexus's serious anxieties. These initiatives seek to
                increase sustainability, resource effectiveness, and resilience
                in managing water, energy and food possessions.
              </Text>
            </div>
            <div className="col-sm-5">
              <SectionInnerTitle>KEY CONTACTS</SectionInnerTitle>
              <Text className="fs-14px fc-black">Vismay Loliyaniya</Text>
              <Text className="fs-14px fc-black"><Link to="https://www.linkedin.com/in/vismayloliyaniya/" target="_blank" title="">https://www.linkedin.com/in/vismayloliyaniya/</Link></Text>
              <Text className="fs-14px fc-black"><Link to="mailto:vismaymloliyaniya@gmail.com">vismaymloliyaniya@gmail.com</Link></Text>
            </div>
          </div>
        </div>
      </section>
      <section className="mission-section py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-sm-7">
              <div className="pe-sm-5">
                <SectionTitle>Mission</SectionTitle>
                <Text className="text-justify mb-4">
                  Our mission is to foster sustainable integration across water,
                  energy, and food systems by providing actionable insights,
                  promoting innovation, and empowering stakeholders to create
                  resilient and equitable solutions for a thriving future.
                </Text>
                <Text className="text-justify">
                  The mission of the Water-Energy-Food (WEF) Nexus initiative is
                  to create a sustainable, integrated approach to addressing the
                  interconnected challenges of water, energy and food systems.
                  These critical sectors are deeply interdependent, and their
                  sustainable management is essential for ensuring the
                  well-being of communities and the preservation of the
                  environment. Our goal is to develop strategies that not only
                  address the needs of today but also pave the way for future
                  generations to thrive in a world facing increasing pressures
                  from climate change, resource scarcity, and population growth.
                </Text>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="img-block d-flex flex-column align-items-center justify-content-center mb-2">
                <div className="img-wrap">
                  <img src={ewfNexus} alt="" width={"100%"} />
                </div>
                <i className="fc-gray fs-14px d-block mt-1">
                  Figure 1: Connection between Water-Energy-Food nexus (Source:
                  Internet)
                </i>
              </div>
            </div>
          </div>
          <SectionTitle>What is the WEF Nexus ?</SectionTitle>
          <Text>
            The "nexus approach," which associations water, energy and food 
            systems, recognizes the interdependence of these three key
            resources. Efficient organization across various areas is vital for
            long-term expansion.
          </Text>
        </div>
      </section>
    </>
  );
};
