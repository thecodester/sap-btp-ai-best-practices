import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Icon from "@site/src/components/Icon";
import contributorsData from "@site/src/data/contributors.json";
import "@ui5/webcomponents-icons/dist/person-placeholder.js";

/**
 * ContributorCard component displays a single contributor's information
 * @param {Object} props
 * @param {string} props.contributorId - Contributor's ID or custom name
 */
function ContributorCard({ contributorId }) {
  // Check if this is a predefined contributor or a custom name
  const contributor = contributorsData.contributors[contributorId] || {
    name: contributorId,
    photo: null
  };

  const [showPlaceholder, setShowPlaceholder] = React.useState(!contributor.photo);
  const photoUrl = contributor.photo?.startsWith("http") ? contributor.photo : useBaseUrl(contributor.photo);

  const CardWrapper = contributor.link ? "a" : "div";
  const cardProps = contributor.link
    ? {
        href: contributor.link,
        target: "_blank",
        rel: "noopener noreferrer"
      }
    : {};

  return (
    <CardWrapper className="contributor-card" {...cardProps}>
      {!showPlaceholder && <img src={photoUrl} alt={contributor.name} className="contributor-photo" onError={() => setShowPlaceholder(true)} />}
      <div className="contributor-photo contributor-photo-placeholder" style={{ display: showPlaceholder ? "flex" : "none" }}>
        <Icon name="person-placeholder" />
      </div>
      <div className="contributor-name">{contributor.name}</div>
    </CardWrapper>
  );
}

/**
 * PageContributors component displays a grid of contributor cards
 * @param {Object} props
 * @param {string[]} props.contributorIds - Array of contributor IDs or custom names to display
 * @param {string} [props.className] - Additional CSS classes to apply to the container
 */
export default function PageContributors({ contributorIds, className = "" }) {
  return (
    <div className={`contributors-grid ${className}`}>
      {contributorIds.map((contributorId) => (
        <ContributorCard key={contributorId} contributorId={contributorId} />
      ))}
    </div>
  );
}
