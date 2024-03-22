module.exports = {
  apps: [
    {
      name: 'JCWD-0406-01', // Format JCWD-{batchcode}-{groupnumber}
      script: 'npm',
      args: 'run serve',
      time: true,
    },
  ],
};
