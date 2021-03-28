/**
 * @async
 * @function parallel
 * @param { Array } jobs 
 * @param { Promise } fn 
 * @param { Number } [maxJobs] 
 * @returns { Promise }
 */
const parallel = async (jobs, fn, maxJobs = 5) => {
  if (!jobs.length) return [];
  let ptr = 0;
  let ctr = 0;
  const rets = new Array(jobs.length);
  return new Promise((resolve, reject) => {
    const pushJob = async (fn, job, index) => {
      try {
        rets[index] = await fn(job);
        if (ptr < jobs.length) {
          pushJob(fn, jobs[ptr], ptr);
          ptr++;
        } else ctr--;
        if (ctr === 0) resolve(rets);
      } catch (e) {
        reject(e);
      }
    };
    while (ctr < maxJobs && ptr < jobs.length) {
      pushJob(fn, jobs[ptr], ptr);
      ptr++;
      ctr++;
    }
  });
};

module.exports = parallel;
