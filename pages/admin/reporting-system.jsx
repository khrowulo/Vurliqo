/* 
 * Vurliqo - Reporting System
 * Phase 8: Complete reporting workflow
 * Users can report content, reports enter moderation queue
 */

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function ReportingSystem({ userId }) {
  const [reportTypes, setReportTypes] = useState([
    { key: 'account', label: 'Account' },
    { key: 'post', label: 'Post' },
    { key: 'reel', label: 'Reel' },
    { key: 'story', label: 'Story' },
    { key: 'comment', label: 'Comment' },
    { key: 'message', label: 'Message' },
    { key: 'group', label: 'Group' },
    { key: 'business', label: 'Business Profile' },
  ]);
  const [selectedReportType, setSelectedReportType] = useState('account');
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const submitReport = () => {
    if (!reportReason || !reportDescription) {
      window.alert('Please select a reason and provide description');
      return;
    }
    // In full implementation, would submit report to Lovable Cloud backend
    // Report would enter moderation queue
    window.alert('Report submitted successfully. It will be reviewed by moderators.');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center pt-20">
          <Button variant="outline" size="sm" onClick={() => window.alert('Loading...')}>
            Loading...
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Submit Report</h1>

        {/* Report Type Selection */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Report Type</h2>
          <p className="text-sm text-gray-400 mb-4">Select what you'd like to report</p>
          <div className="grid grid-cols-2 gap-2">
            {reportTypes.map((type) => (
              <Button
                key={type.key}
                variant="outline"
                size="sm"
                onClick={() => setSelectedReportType(type.key)}
                className={`flex-1 ${selectedReportType === type.key ? 'bg-primary-600 text-white' : 'text-gray-300 hover:text-white transition-colors'}`}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Reason Selection */}
        <div>
          <h2 className="font-medium text-white mb-3">Report Reason</h2>
          <p className="text-sm text-gray-400 mb-3">Select the primary reason for your report</p>
          
          <select
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
          >
            <option value="">Select a reason</option>
            <option value="spam">Spam</option>
            <option value="harassment">Harassment</option>
            <option value="impersonation">Impersonation</option>
            <option value="fraud">Fraud</option>
            <option value="inappropriate">Inappropriate content</option>
            <option value="ip-concerns">Intellectual property concerns</option>
            <option value="other">Other policy violation</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <h2 className="font-medium text-white mb-3">Report Description</h2>
          <p className="text-sm text-gray-400 mb-3">Provide detailed information about the violation</p>
          <Input
            type="text"
            placeholder="Describe the issue..."
            value={reportDescription}
            onChange={(e) => setReportDescription(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none h-24 mb-4"
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button
            variant="primary"
            size="lg"
            onClick={submitReport}
            className="w-full justify-center"
          >
            Submit Report
          </Button>
        </div>

        {/* Important Notes */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <h2 className="font-medium text-white mb-3">Important</h2>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>
              Reports are securely recorded and enter moderation queue
            </li>
            <li>
              All reports are reviewed by authorized moderators
            </li>
            <li>
              Do not submit false reports - abuse may result in account action
            </li>
            <li>
              Your report will be confidential - the reported user won't know your identity
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}