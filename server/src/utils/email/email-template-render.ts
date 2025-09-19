import pug from "pug";
import path from "path";

// type EmailType = 'welcome' | 'forget-password' | 'reset-password';
type TemplateOptions = {
  url: string;
  name: string;
};
// Render a pug Template into html string to be used as email body
export const renderEmailTemplate = (type: string, templateData: any) => {
  let emailTemplateName = "welcome.pug";
  switch (type) {
    case "welcome":
      emailTemplateName = "welcome.pug";
      break;
    case "forget-password":
      emailTemplateName = "forget-password.pug";
      break;
    case "reset-password":
      emailTemplateName = "reset-password.pug";
      break;
    case "signup-verification":
      emailTemplateName = "signup-verification.pug";
      break;
  }
  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    emailTemplateName
  );
  const html = pug.renderFile(templatePath, templateData);
  return html;
};
