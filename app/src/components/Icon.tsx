import React, { useState, useEffect } from "react";
import { Icon as Ui5Icon } from "@ui5/webcomponents-react";

// Wraps the UI5 Icon component to address a rendering issue in Docusaurus MDX files.
// A minimal, fixed delay (1ms) is introduced before rendering the icon,
// ensuring consistent loading where direct usage of the UI5 Icon might otherwise fail.

// Use React.ComponentProps to get the props of the Ui5Icon component
// Omit 'name' as it's handled specifically, and ensure 'name' is string in our props.
interface IconProps extends Omit<React.ComponentProps<typeof Ui5Icon>, "name"> {
  name: string;
  [key: string]: any;
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1); // Hardcoded delay to 1ms
    return () => clearTimeout(timer);
  }, []); // Empty dependency array as delay is constant

  if (!visible) {
    return null;
  }

  return <Ui5Icon name={name} {...props} />;
};

export default Icon;
