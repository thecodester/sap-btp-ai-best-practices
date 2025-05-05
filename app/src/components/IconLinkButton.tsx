import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Icon } from "@ui5/webcomponents-react";
import { getIconForCapability } from "@site/src/data/capabilityIcons";

interface Props {
  /** The target URL for the link. Required. */
  href: string;
  /** The text content of the link. Required. */
  text: string;
  /** Optional direct specification of the UI5 icon name. */
  icon?: string;
  /** Whether the link should be disabled. Defaults to false. */
  disabled?: boolean;
}

/**
 * Renders a list item containing a link styled as a button with an icon.
 *
 * The icon can be specified directly via the `icon` prop.
 * If the `icon` prop is not provided, it attempts to look up an icon
 * based on the `href` using the `capabilityIcons` mapping.
 */
const IconLinkButton: React.FC<Props> = ({ href, icon, text, disabled = false }) => {
  // href is guaranteed by Props type, but disabled might make it unusable
  const linkUrl = !disabled ? useBaseUrl(href) : undefined;
  const linkClass = disabled ? "disabled" : "";
  // Use provided icon directly, or look up based on href as a fallback
  // Pass href directly, getIconForCapability handles undefined
  const iconName = icon || getIconForCapability(href);

  // Always render an <a> tag. The lack of a valid href on disabled items
  // combined with the .disabled class should handle behavior and styling.

  return (
    <li className="list-button-item">
      <a href={linkUrl} className={linkClass}>
        {iconName && <Icon name={iconName}></Icon>}
        <span>{text}</span>
      </a>
    </li>
  );
};

export default IconLinkButton;
