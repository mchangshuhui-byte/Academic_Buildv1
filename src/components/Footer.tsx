/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Footer() {
  return (
    <footer className="bg-tertiary-fixed dark:bg-tertiary-container mt-12 border-t border-outline-variant/50">
      <div className="w-full py-12 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <div className="col-span-1">
          <span className="text-sm font-bold text-primary block mb-3">Academic Nexus</span>
          <p className="text-sm text-on-tertiary-fixed-variant opacity-80 mb-4 leading-relaxed">
            Elevating student experience through integrated course management and academic logistics at the National University of Singapore.
          </p>
          <p className="text-xs text-on-tertiary-fixed-variant opacity-60">
            © 2026 Academic Nexus - National University of Singapore Branding
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-on-tertiary-fixed mb-3 uppercase tracking-wider">Academics</h4>
          <ul className="space-y-2">
            <li>
              <a className="text-xs text-on-tertiary-fixed-variant hover:text-primary hover:opacity-100 transition-all duration-200" href="#">
                Academic Calendar
              </a>
            </li>
            <li>
              <a className="text-xs text-on-tertiary-fixed-variant hover:text-primary hover:opacity-100 transition-all duration-200" href="#">
                Faculty Directory
              </a>
            </li>
            <li>
              <a className="text-xs text-on-tertiary-fixed-variant hover:text-primary hover:opacity-100 transition-all duration-200" href="#">
                Course Archive
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold text-on-tertiary-fixed mb-3 uppercase tracking-wider">Support</h4>
          <ul className="space-y-2">
            <li>
              <a className="text-xs text-on-tertiary-fixed-variant hover:text-primary hover:opacity-100 transition-all duration-200" href="#">
                Contact Support
              </a>
            </li>
            <li>
              <a className="text-xs text-on-tertiary-fixed-variant hover:text-primary hover:opacity-100 transition-all duration-200" href="#">
                Help Center
              </a>
            </li>
            <li>
              <a className="text-xs text-on-tertiary-fixed-variant hover:text-primary hover:opacity-100 transition-all duration-200" href="#">
                Registration Guides
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold text-on-tertiary-fixed mb-3 uppercase tracking-wider">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a className="text-xs text-on-tertiary-fixed-variant hover:text-primary hover:opacity-100 transition-all duration-200" href="#">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="text-xs text-on-tertiary-fixed-variant hover:text-primary hover:opacity-100 transition-all duration-200" href="#">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
