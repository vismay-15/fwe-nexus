import React from "react";
import "./style.css";
import { SectionTitle } from "../../components/SectionTitle";
import { Text } from "../../components/Text";
import { PageTitle } from "../../components/PageTitle";
import { SectionInnerTitle } from "../../components/SectionInnerTitle";
import fewNexus from "../../assets/images/fwe-nexus.jpg";

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
          <PageTitle className="mb-4">Food Water Energy Nexus</PageTitle>
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
                Addressing the interconnected demands of water, energy, and food
                systems is critical to achieving a balanced and resilient future
                for communities worldwide.
              </SectionTitle>
              <Text className="text-justify">
                The Food-Water-Energy (FWE) Nexus method is a significant
                paradigm for solving the linked difficulties of resource
                organization in the modern world. The nexus comprehends that
                food production, water stock, and energy generation are all
                interrelated systems, and any actions or policies impacting one
                would positively influence the others.
              </Text>
              <Text className="text-justify">
                Abundant efforts and programs have been launched across EU to
                address the nexus's serious anxieties. These initiatives seek to
                increase sustainability, resource effectiveness, and resilience
                in managing food, water, and energy possessions.
              </Text>
            </div>
            <div className="col-sm-5">
              <SectionInnerTitle>KEY CONTACTS</SectionInnerTitle>
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
                  The mission of the Food-Water-Energy (FWE) Nexus initiative is
                  to create a sustainable, integrated approach to addressing the
                  interconnected challenges of food, water, and energy systems.
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
                  <img src={fewNexus} alt="" width={"100%"} />
                </div>
                <i className="fc-gray fs-14px d-block mt-1">
                  Figure 1: Connection between Food-Water-Energy nexus (Source:
                  Internet)
                </i>
              </div>
            </div>
          </div>
          <SectionTitle>What is the FWE Nexus ?</SectionTitle>
          <Text>
            The "nexus approach," which associations food, water, and energy
            systems, recognizes the interdependence of these three key
            resources. Efficient organization across various areas is vital for
            long-term expansion.
          </Text>
        </div>
      </section>
    </>
  );
};
