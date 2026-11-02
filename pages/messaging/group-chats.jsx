/*
 * Vurliqo - Group Chats
 * Phase 4: Group conversations management
 */

import { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function GroupChats() {
  const [groups, setGroups] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');

  useEffect(() => {
    // In a full implementation, would fetch groups from backend
    const mockGroups = [
      {
        id: '1',
        name: 'Work Friends',
        description: 'Weekly lunch planning and work chat',
        participant_count: 5,
        last_message: 'Lunch next week?',
        last_message_at: new Date(),
        is_muted: true,
      },
      {
        id: '2',
        name: 'Family Group',
        description: 'Family updates and events',
        participant_count: 8,
        last_message: 'Birthday reminder',
        last_message_at: new Date(Date.now() - 86400000),
        is_muted: false,
      },
    ];

    setGroups(mockGroups);
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    setIsCreating(true);
    // In full implementation, would create group and refresh list
    setIsCreating(false);
    setNewGroupName('');
    setNewGroupDescription('');
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <Image
            src="/vurliqo-logo.svg"
            alt="Vurliqo"
            width={60}
            height={60}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
          <p className="text-sm text-gray-500">Group conversations</p>
        </div>

        {/* Create Group Form */}
        <form onSubmit={handleCreate} className="mb-6 rounded-xl bg-gray-800 p-4 border border-gray-700">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Input
              placeholder="Group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Input
              placeholder="Description (optional)"
              value={newGroupDescription}
              onChange={(e) => setNewGroupDescription(e.target.value)}
              className="rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>
          <Button
            variant="primary"
            type="submit"
            disabled={!newGroupName.trim() || isCreating}
          >
            {isCreating ? 'Creating...' : 'Create Group'}
          </Button>
        </form>

        {/* Groups List */}
        {isCreating ? (
          <div className="min-h-[300px] flex justify-center items-center text-gray-500">Creating group...</div>
        ) : groups.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            <p>No groups yet. Create one above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {groups.map((group) => (
              <div
                key={group.id}
                className="rounded-xl bg-gray-800 p-4 border border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-300">
                      {group.name.substring(0, 1)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">{group.name}</p>
                    <p className="text-xs text-gray-400">{group.description}</p>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{group.participant_count} members</span>
                    <span>·</span>
                    <span>
                      {new Date(group.last_message_at).toLocaleDateString()}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.alert('Group options')}
                  >
                    ⋯
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}