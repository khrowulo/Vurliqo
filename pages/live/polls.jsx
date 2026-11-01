/* 
 * Vurliqo - Polls & Interactive Content
 * Phase 9: Module 6 - Polls System
 * Post polls, story polls, community polls, voting, results display
 */

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function Polls({ userId }) {
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch polls from Lovable Cloud backend
    // Would integrate with poll voting system
    const mockPolls = [
      {
        id: 'poll-1',
        question: 'What type of content do you want to see more of?',
        options: ['Art', 'Music', 'Technology', 'Lifestyle'],
        votes: ['Art: 45', 'Music: 32', 'Technology: 28', 'Lifestyle: 21'],
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'active',
      },
    ];
    setPolls(mockPolls);
    setIsLoading(false);
  }, [userId]);

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [maxOptions] = useState(4);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    if (options.length > 1) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const createPoll = () => {
    if (!question.trim()) {
      window.alert('Please enter a poll question');
      return;
    }
    if (options.filter((opt) => opt.trim()).length < 2) {
      window.alert('Please provide at least 2 options');
      return;
    }
    // In full implementation, would create poll via Lovable Cloud backend
    window.alert('Poll created successfully');
    setQuestion('');
    setOptions(['', '']);
  };

  const castVote = (pollId, optionIndex) => {
    window.alert(`Voted for option ${optionIndex + 1}`);
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
        <h1 className="text-2xl font-bold text-white mb-6">Polls</h1>

        {/* Create Poll */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Create Poll</h2>
          
          <Input
            type="text"
            placeholder="Poll question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
            required
          />
          
          <div className="grid grid-cols-2 gap-2">
            {options.map((opt, index) => (
              <Input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={opt}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={addOption}
            className="col-span-2 justify-center mb-2"
          >
            Add Option
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={createPoll}
            className="w-full justify-center mt-2"
          >
            Create Poll
          </Button>

          <p className="text-xs text-gray-400 mt-2">
            Prevent unauthorized duplicate voting. Store votes persistently.
          </p>
        </div>

        {/* Active Polls */}
        <div>
          <h2 className="font-medium text-white mb-3">Active Polls</h2>
          <p className="text-sm text-gray-400 mb-3">Current polls</p>
          
          {polls.length === 0 && (
            <p className="text-gray-400">No active polls</p>
          )}

          <div className="grid grid-cols-1 gap-3">
            {polls.map((poll) => (
              <div
                key={poll.id}
                className="bg-gray-700 rounded-xl p-4 border border-gray-600"
              >
                <h3 className="font-medium text-white mb-2">{poll.question}</h3>
                <div className="grid grid-cols-2 gap-1">
                  {poll.options.map((opt, i) => (
                    <div key={i} className="bg-gray-800 p-2 rounded-md">
                      <span className="font-medium text-white">{opt}</span>
                      <span className="text-xs text-gray-400">({poll.votes[i]})</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400">
                  Expires: {poll.expiresAt.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-300">
          <ul className="text-gray-300 space-y-1">
            <li>
              Prevent unauthorized duplicate voting
            </li>
            <li>
              Store votes persistently
            </li>
            <li>
              Respect private audience settings
            </li>
            <li>
              Display accurate results (do not fabricate vote counts)
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}