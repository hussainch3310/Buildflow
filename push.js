const { execSync } = require('child_process');
try {
  execSync('git add apps/web/src/app/\\(auth\\)/login/page.tsx apps/web/src/app/\\(dashboard\\)/seo/page.tsx apps/web/src/app/\\(dashboard\\)/writing/page.tsx', { stdio: 'inherit' });
  execSync('git commit -m "Fix hardcoded localhost API URLs"', { stdio: 'inherit' });
  execSync('git push', { stdio: 'inherit' });
  console.log('Successfully pushed!');
} catch (error) {
  console.error('Failed to run git commands:', error);
}
