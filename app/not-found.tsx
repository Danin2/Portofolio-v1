import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-2xl">
        {/* 404 */}
        <h1 className="text-9xl font-bold text-accent-blue">404</h1>
        
        {/* Message */}
        <h2 className="text-h2 font-bold">Page Not Found</h2>
        <p className="text-body-lg text-text-secondary">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button variant="primary" size="lg" href="/">
            Go Home
          </Button>
          <Button variant="outline" size="lg" href="/projects">
            View Projects
          </Button>
        </div>

        {/* Quick Links */}
        <div className="pt-12">
          <p className="text-sm text-text-muted mb-4">Or try these pages:</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/about" className="text-accent-blue hover:underline">
              About
            </Link>
            <span className="text-text-muted">•</span>
            <Link href="/blog" className="text-accent-blue hover:underline">
              Blog
            </Link>
            <span className="text-text-muted">•</span>
            <Link href="/contact" className="text-accent-blue hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}