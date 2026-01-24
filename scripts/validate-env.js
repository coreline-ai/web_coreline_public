/**
 * Pre-build environment validation script.
 * This script runs before Next.js build to ensure all required
 * environment variables are properly set for production.
 * 
 * Usage: node scripts/validate-env.js
 */

const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';

const REQUIRED_VARS = [
    { name: 'JWT_SECRET', minLength: 32, description: 'JWT signing secret (min 32 chars)' },
    { name: 'NEXTAUTH_SECRET', minLength: 32, description: 'NextAuth secret (min 32 chars)' },
    { name: 'NEXTAUTH_URL', description: 'NextAuth URL (https://your-domain.com)' },
];

const BACKEND_VARS = [
    { name: 'BACKEND_URL', description: 'Backend API URL', mustBeHttps: true },
    { name: 'ALLOWED_ORIGINS', description: 'CORS allowed origins' },
];

function validate() {
    if (!isProduction) {
        console.log('📝 Development environment - skipping strict validation');
        return true;
    }

    console.log('🔍 Validating production environment variables...\n');

    let hasErrors = false;
    const warnings = [];

    for (const varConfig of [...REQUIRED_VARS, ...BACKEND_VARS]) {
        const value = process.env[varConfig.name];

        if (!value) {
            console.log(`❌ ${varConfig.name}: NOT SET - ${varConfig.description}`);
            hasErrors = true;
            continue;
        }

        // Check minimum length
        if (varConfig.minLength && value.length < varConfig.minLength) {
            console.log(`⚠️  ${varConfig.name}: Too short (${value.length}/${varConfig.minLength} chars)`);
            warnings.push(varConfig.name);
            continue;
        }

        // Check HTTPS requirement
        if (varConfig.mustBeHttps && !value.startsWith('https://')) {
            console.log(`⚠️  ${varConfig.name}: Should use HTTPS in production`);
            warnings.push(varConfig.name);
            continue;
        }

        // Mask secrets
        if (varConfig.name.includes('SECRET') || varConfig.name.includes('KEY')) {
            console.log(`✅ ${varConfig.name}: SET (****)`);
        } else {
            console.log(`✅ ${varConfig.name}: ${value}`);
        }
    }

    console.log('\n' + '='.repeat(50));

    if (hasErrors) {
        console.log('\n❌ BUILD BLOCKED: Missing required environment variables!');
        console.log('   Please set the missing variables in Vercel Dashboard:');
        console.log('   Settings → Environment Variables');
        process.exit(1);
    }

    if (warnings.length > 0) {
        console.log(`\n⚠️  Warnings: ${warnings.length} variable(s) may need attention`);
    }

    console.log('\n✅ Environment validation passed!');
    return true;
}

validate();
