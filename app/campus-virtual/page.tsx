"use client";

import { useState, useEffect } from "react";
import { Curso } from "@/Types/curso.types";
import axios from "../../utils/axios.config";
import Link from "next/link";
import { slugify } from "@/utils/slugify";
import DashEstudiante from "@/components/DashEstudiante";
import CampusVirtualSidebar from "@/components/CampusVirtualSidebar";

const Dashboard: React.FC = () => {

  return (
    <CampusVirtualSidebar />
  );
}; 

export default Dashboard;
