const tableParsing = (data) => {
  const rows = data.trim().split('\n').map((row) => row.split(';'));

  // Step 1
  const maxRatingRow = rows.reduce((prev, curr) => {
    const prevRating = parseFloat(prev[2]) + parseFloat(prev[3]);
    const currRating = parseFloat(curr[2]) + parseFloat(curr[3]);
    return prevRating > currRating ? prev : curr;
  });
  const topMessenger = maxRatingRow[0];
  const ownerTop = maxRatingRow[1];
  console.log(`General top messenger: ${topMessenger}, Owner: ${ownerTop}`);

  // Step 2
  const downloadsIndia = rows.map(row => parseInt(row[6], 10) || 0);
  const maxDownloadsIndia = Math.max(...downloadsIndia);
  const minDownloadsIndia = Math.min(...downloadsIndia.filter(count => count > 0)); // Filter out 0 counts
  console.log(`Download count: Max count: ${maxDownloadsIndia}, Min count: ${minDownloadsIndia}`);

  // Step 3
  const appsAustralia = rows.map((row) => row[5]);
  const top3AppsAustralia = appsAustralia.sort().slice(0, 3);
  console.log(`Top-3 Australia: ${top3AppsAustralia.join(', ')}`);

  // Step 4
  const avgDownloads = rows.map(row => row.slice(4).reduce((acc, curr) => acc + (parseInt(curr, 10) || 0), 0) / 4);
  const sortedApps = rows.map((row, index) => ({ name: row[0], avgDownloads: avgDownloads[index] }))
    .sort((a, b) => b.avgDownloads - a.avgDownloads)
    .map(app => app.name)
    .slice(0, 8);
  console.log(`Top downloads: ${sortedApps.join(', ')}`);
  // Step 5
  const owners = {};
  rows.forEach((row) => {
    const owner = row[1];
    if (owners[owner]) {
      owners[owner]++;
    } else {
      owners[owner] = 1;
    }
  });
  const topOwners = Object.entries(owners)
    .filter(([ownerKey, count]) => count >= 2)
    .map(([ownerKey]) => ownerKey);
  console.log(`Top owner: ${topOwners.join(', ')}`);
};
// task 2
const candidateAssessment = (/* content */) => {

};

// task 3
const actorRating = (/* content */) => {

};

export { tableParsing, candidateAssessment, actorRating };
