import { UseQueryResult } from "@tanstack/react-query";

export default function FeatureIndex<T>({
  featureLabel,
  featureUseQueryResult,
  featureHeaders,
  gridColsRule,
  renderContentFn,
}: {
  featureName: string;
  featureLabel: string;
  featureUseQueryResult: UseQueryResult<{ data: T }>;
  featureHeaders: string[];
  gridColsRule: string;
  renderContentFn: (data: T) => React.ReactNode;
}) {
  const { isLoading, isSuccess, error, data } = featureUseQueryResult;

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!isSuccess) {
    return (
      <div>
        <p>There was a problem fetching the {featureLabel} data.</p>
      </div>
    );
  }

  const { data: dataToMap } = data;

  return (
    <div className="border border-border">
      <div className={`grid ${gridColsRule} p-2 bg-secondary`}>
        {featureHeaders.map((header, index) => (
          <p key={index}>{header}</p>
        ))}
      </div>
      <div className="">{renderContentFn(dataToMap)}</div>
    </div>
  );
}
