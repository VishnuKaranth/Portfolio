const site_url = 
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const siteConfig = {
    name: "Vishnu | Personal Portfolio",
    description:
        "Personal portfolio of website showcasing my projects and skills as a full stack developer.",
    url: site_url,
    ogImage: `${site_url}/_static/og-image.png`,
    links: {
        instagram: "https://instagram.com/",
        github: "https://github.com/vishnukaranth",
    },
    mailSupport: "vishnukaranth04@gmail.com",
};