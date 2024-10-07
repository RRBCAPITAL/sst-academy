import { getCourses } from "@/utils/getCourses";
import { slugify } from "@/utils/slugify";

export default async function sitemap() {

    const currentDate = new Date().toISOString();
    const courses: any[] = await getCourses();
  
    const staticUrls = [
        {
          url: 'https://www.sstacademia.com/',
          lastModified: currentDate,
          changeFrequency: 'daily',
          priority: 1,
        },
        {
          url: 'https://www.sstacademia.com/campus-virtual-login',
          lastModified: currentDate,
          changeFrequency: 'daily',
          priority: 0.9,
        },
      ];

      const dynamicUrls = courses.map(course => ({
        url: `https://www.sstacademia.com/cursos-virtuales/${slugify(course.nombre)}`, // Cambiado de course.id a course.curso_id
        lastModified: currentDate,
        changeFrequency: 'daily', // Puedes ajustar esto según sea necesario
        priority: 0.8, // Ajusta según la importancia del curso
      }));

      return [...staticUrls, ...dynamicUrls];
    }