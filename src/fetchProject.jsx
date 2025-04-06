import { createClient } from "contentful";
import { useEffect, useState } from "react";

const client = createClient({
  space: "8l24phjj0y3q",
  environment: "master",
  accessToken: import.meta.env.VITE_API_KEY,
});

export const useFetchProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await client.getEntries({ content_type: "project" });
      const data = response.items;
      const project = data.map((item) => {
        const { title, url } = item.fields;
        const id = item.sys.id;
        const image = item.fields.image.fields.file.url;
        return { title, url, image, id };
      });

      setProjects(project);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { projects, loading };
};

// client
//   .getEntries({
//     content_type: "project",
//   })
//   .then((response) => {
//     console.log(response);
//   });
