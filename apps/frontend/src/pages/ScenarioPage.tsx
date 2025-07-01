import { useState } from 'react';

export function ScenarioPage() {
  const [entryUrl, setEntryUrl] = useState('');
  const [rawScenario, setRawScenario] = useState('');
  const [refinedTestCase, setRefinedTestCase] = useState('');
  const [adjustmentFeedback, setAdjustmentFeedback] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [isAdjusting, setIsAdjusting] = useState(false);

  // Mock function to simulate scenario refinement
  const handleRefineScenario = async () => {
    if (!rawScenario.trim()) return;
    
    setIsRefining(true);
    
    // Mock refined test case
    setTimeout(() => {
      const mockRefinedTestCase = `
**Test Case: ${rawScenario.split('\n')[0] || 'User Journey Test'}**

**Entry URL:** ${entryUrl}

**Test Steps:**
1. Navigate to ${entryUrl}
2. Wait for page to load completely
3. Verify page title contains expected text
${rawScenario.split('\n').map((line, index) => {
  if (line.trim()) {
    return `${index + 4}. ${line.trim().replace(/^-\s*/, '')}`;
  }
  return '';
}).filter(Boolean).join('\n')}

**Expected Results:**
- All steps should execute without errors
- Page should respond within 3 seconds
- All elements should be visible and interactable

**Browser Support:** Chrome, Firefox, Safari
**Test Priority:** High
      `.trim();
      
      setRefinedTestCase(mockRefinedTestCase);
      setIsRefining(false);
    }, 2000);
  };

  // Mock function to simulate test case adjustment
  const handleAdjustTestCase = async () => {
    if (!adjustmentFeedback.trim()) return;
    
    setIsAdjusting(true);
    
    setTimeout(() => {
      const adjustedTestCase = refinedTestCase + `\n\n**Adjustments Applied:**\n- ${adjustmentFeedback}`;
      setRefinedTestCase(adjustedTestCase);
      setAdjustmentFeedback('');
      setIsAdjusting(false);
    }, 1500);
  };

  const handleFinalizeScenario = () => {
    alert('시나리오가 확정되었습니다! E2E 테스트를 진행할 수 있습니다.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">E2E 테스트 시나리오 작성</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Sections */}
          <div className="space-y-6">
            {/* 1. Entry URL Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. 테스트 시작 URL</h2>
              <input
                type="url"
                value={entryUrl}
                onChange={(e) => setEntryUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-600 mt-2">
                테스트를 시작할 웹페이지 URL을 입력하세요
              </p>
            </div>

            {/* 2. Raw Scenario Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. 기본 시나리오 입력</h2>
              <textarea
                value={rawScenario}
                onChange={(e) => setRawScenario(e.target.value)}
                placeholder="테스트하고 싶은 시나리오를 자유롭게 작성하세요.&#10;예:&#10;- 로그인 버튼 클릭&#10;- 이메일과 비밀번호 입력&#10;- 로그인 성공 확인"
                rows={8}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="mt-4">
                <button
                  onClick={handleRefineScenario}
                  disabled={!rawScenario.trim() || !entryUrl.trim() || isRefining}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                >
                  {isRefining ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      시나리오 정제중...
                    </>
                  ) : (
                    '시나리오 정제하기'
                  )}
                </button>
              </div>
            </div>

            {/* 3. Adjustment Feedback Section */}
            {refinedTestCase && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">3. 테스트케이스 조정 요청</h2>
                <textarea
                  value={adjustmentFeedback}
                  onChange={(e) => setAdjustmentFeedback(e.target.value)}
                  placeholder="정제된 테스트케이스를 어떻게 수정하고 싶은지 작성하세요.&#10;예:&#10;- 대기 시간을 5초로 늘려주세요&#10;- 추가 검증 단계를 넣어주세요"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={handleAdjustTestCase}
                    disabled={!adjustmentFeedback.trim() || isAdjusting}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                  >
                    {isAdjusting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        조정중...
                      </>
                    ) : (
                      '테스트케이스 조정'
                    )}
                  </button>
                  <button
                    onClick={handleFinalizeScenario}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    시나리오 확정하기
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Refined Test Case Display */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">정제된 테스트케이스</h2>
            {refinedTestCase ? (
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                  {refinedTestCase}
                </pre>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-md text-center text-gray-500">
                시나리오를 입력하고 '시나리오 정제하기' 버튼을 클릭하면<br />
                상세한 테스트케이스가 여기에 표시됩니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
