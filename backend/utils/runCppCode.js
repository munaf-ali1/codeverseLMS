import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

export const runCppCode = async (code, input) => {
  const jobId = uuid();
  const dir = path.join("judge", jobId);

  fs.mkdirSync(dir, { recursive: true });

  const cppFile = path.join(dir, "main.cpp");
  const inputFile = path.join(dir, "input.txt");
  const exeFile = path.join(dir, "a.exe");

  fs.writeFileSync(cppFile, code);
  fs.writeFileSync(inputFile, input);

  return new Promise((resolve, reject) => {
    // compile
    exec(
      `g++ ${cppFile} -o ${exeFile}`,
      (compileErr) => {
        if (compileErr) {
          return reject("Compilation Error");
        }

        // run
        exec(
          `${exeFile} < ${inputFile}`,
          { timeout: 5000 },
          (runErr, stdout, stderr) => {
            if (runErr) {
              return reject("Runtime Error");
            }

            resolve(stdout.trim());
          }
        );
      }
    );
  });
};
