"use client";
import { motion } from "framer-motion";
import {
  BookText,
  Brain,
  ClipboardCheck,
  FileText,
  FlaskConical,
  Megaphone,
  Mic,
  Scale,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Modal } from "./modal/Modal";
import SectionTitle from "./shared/sectionTitle/SectionTitle";
import MainComponents from "@/feature/searchCategory/MainComponents";

export default function JobCategories() {
  const categories = [
    {
      id: 1,
      icon: <Stethoscope className="w-6 h-6" />,
      title: "Consulting",
      slug: "consulting",
      description: "Get expert advice from certified healthcare professionals.",
    },
    {
      id: 2,
      icon: <Brain className="w-6 h-6" />,
      title: "Coaching",
      slug: "coaching",
      description: "Access professional mentorship for career growth and personal development.",
    },
    {
      id: 3,
      icon: <Scale className="w-6 h-6" />,
      title: "Expert Witness",
      slug: "expert-witness",
      description: "Obtain expert legal and medical opinions for case evaluations.",
    },
    {
      id: 4,
      icon: <FileText className="w-6 h-6" />,
      title: "Medical Writing / Content Creation",
      slug: "medical-writing-content-creation",
      description: "Receive high-quality medical content crafted by professional writers.",
    },
    {
      id: 5,
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: "Résumé Review",
      slug: "resume-review",
      description: "Get professional feedback to improve your resume and job applications.",
    },
    {
      id: 6,
      icon: <BookText className="w-6 h-6" />,
      title: "Tutoring / Test Prep",
      slug: "tutoring-test-prep",
      description: "Prepare for exams with expert-led tutoring sessions and study materials.",
    },
    {
      id: 7,
      icon: <FlaskConical className="w-6 h-6" />,
      title: "Product Testing & Reviewing",
      slug: "product-testing-reviewing",
      description: "Evaluate and review healthcare and wellness products with expert insights.",
    },
    {
      id: 8,
      icon: <Mic className="w-6 h-6" />,
      title: "Mock Interviews",
      slug: "mock-interviews",
      description: "Practice and refine your interview skills with professional guidance.",
    },
    {
      id: 9,
      icon: <Megaphone className="w-6 h-6" />,
      title: "Brand Ambassadors",
      slug: "brand-ambassadors",
      description: "Collaborate with brands to promote healthcare and wellness products.",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<null | number>(null);

  const handleCategoryClick = (id: number) => {
    setSelectedCategory(id);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  const activeCategory = categories.find((c) => c.id === selectedCategory);

  return (
    <section className="bg-primary/10 section-gap">
      <div className="container">
        <SectionTitle
          miniTitle="Our Categories"
          subtitle=""
          title="Explore Experts By Category"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {categories.map((category) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeIn" }}
              key={category.id}
              className="bg-white p-4 sm:p-6 rounded-lg border border-gray-100 hover:border-primary transition-all duration-300 cursor-pointer group"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="mb-4">{category.icon}</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-black mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600 sm:text-lg text-sm leading-relaxed">
                {category.description}
              </p>
              <div className="py-2 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-all duration-300">
                <FaArrowRightLong className="text-primary" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ✅ Single Modal Outside the Map */}
        <Modal isOpen={!!selectedCategory} onClose={handleCloseModal}>
          {activeCategory && <MainComponents activeCategory={activeCategory} />}
        </Modal>
      </div>
    </section>
  );
}
