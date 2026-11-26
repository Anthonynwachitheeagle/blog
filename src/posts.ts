export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
}

// Add new posts at the top of this list. The slug becomes the URL: #/post/your-slug
export const posts: Post[] = [
  {
    slug: "automating-vulnerability-scans",
    title: "Automating Vulnerability Scans with Python",
    date: "2026-11-20",
    excerpt: "How a simple Python wrapper around Nmap can cut assessment time and make results easier to act on.",
    body: [
      "Manual scanning works for a single host, but it breaks down quickly across a large network. Automating the process saves time and makes results consistent.",
      "In my own work, a small Python script that calls Nmap, parses the output, and flags risky services reduced assessment time by about 25 percent. The key was keeping the output simple enough for developers to act on.",
      "Automation should never replace judgment. Every flagged finding still needs a human to confirm it before it goes into a report."
    ]
  },
  {
    slug: "why-siem-alerts-matter",
    title: "Why SIEM Alerts Matter More Than the Dashboard",
    date: "2026-11-10",
    excerpt: "Dashboards look impressive, but the real value of a SIEM is in the alerts that trigger a response.",
    body: [
      "A SIEM collects logs from across an environment and correlates them into something useful. Most of the work is in writing rules that catch real threats without drowning analysts in noise.",
      "When I set up Splunk monitoring, the biggest improvements came from tuning alerts, not from adding more dashboards."
    ]
  }
];
