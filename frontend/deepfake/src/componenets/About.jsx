import React from "react";
import Navbar from "../componenets/Navbar";
import { motion } from "framer-motion";

export default function About() {
  const teamMembers = [
    {
      name: "John Smith",
      role: "AI Research Lead",
      bio: "Expert in deep learning and computer vision with 8+ years of experience in AI research.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      bio: "Specialized in modern web technologies and user experience design.",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Michael Chen",
      role: "Backend Engineer",
      bio: "Full-stack developer with expertise in scalable systems and API design.",
      image: "https://randomuser.me/api/portraits/men/65.jpg"
    },
    {
      name: "Emily Davis",
      role: "Data Scientist",
      bio: "Machine learning specialist focused on image analysis and pattern recognition.",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  };

  const floatVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      <div className="h-20" /> {/* Spacer for fixed navbar */}

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6"
          >
            About DeepGuard AI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-blue-800 max-w-3xl mx-auto mb-12"
          >
            We're a team of passionate technologists dedicated to fighting digital deception through advanced AI technology. Our mission is to protect digital truth and build trust in online content.
          </motion.p>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-16 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-center text-blue-900 mb-12"
          >
            Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                whileHover="hover"
                animate="float"
                variants={floatVariants}
                className="bg-white rounded-2xl shadow-xl overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
              </div>
                <div className="p-6">
                  <motion.h3 
                    className="text-xl font-bold text-blue-900 mb-1"
                    whileHover={{ color: "#1e40af" }}
                  >
                    {member.name}
                  </motion.h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg mb-6">
                In an era where digital content can be easily manipulated, we're committed to developing cutting-edge solutions that help identify and combat deepfakes and manipulated media.
              </p>
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <span className="text-2xl">🛡️</span>
                  <span>Protecting digital truth</span>
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <span className="text-2xl">🤖</span>
                  <span>Advancing AI technology</span>
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <span className="text-2xl">🌐</span>
                  <span>Building trust online</span>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl"
                animate={{ rotate: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="relative bg-white/10 backdrop-blur rounded-2xl p-8"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-4">Our Technology</h3>
                <motion.ul 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.li 
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <span className="text-xl">⚡</span>
                    <span>Advanced neural networks</span>
                  </motion.li>
                  <motion.li 
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <span className="text-xl">🔍</span>
                    <span>Real-time analysis</span>
                  </motion.li>
                  <motion.li 
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <span className="text-xl">📊</span>
                    <span>High accuracy detection</span>
                  </motion.li>
                  <motion.li 
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <span className="text-xl">🔄</span>
                    <span>Continuous improvement</span>
                  </motion.li>
                </motion.ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900 text-gray-300 py-8 text-center"
      >
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} DeepGuard AI. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}
