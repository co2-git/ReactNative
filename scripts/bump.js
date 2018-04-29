const [,, action = 'bump', pkg, version] = process.argv;

const info = JSON.parse(pkg);

if (action === 'bump') {
  const [api, major, minor] = info.version.split(/\./);
  const newVersion = `${api}.${major}.${Number(minor) + 1}`;
  console.log(newVersion);
} else if (action === 'rewrite') {
  info.version = version;
  const rw = JSON.stringify(info, null, 2);
  console.log(rw)
} else {
  throw new Error('Unknown action');
}
