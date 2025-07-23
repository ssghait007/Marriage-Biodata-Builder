import React from 'react';

const TemplatePreview = ({
  template,
  htmlFiles,
  injectFormDataIntoTemplate,
  formData,
  preview,
  isPhone
}) => {
  if (!htmlFiles[template - 1]) return null;

  return (
    <div className="lg:col-span-1 flex justify-center sticky top-24 h-fit">
      <div className="w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-lg">
        <div className="relative">
          {/* Mobile Preview Header */}
          {isPhone && (
            <div className="mb-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Template Preview</h3>
              <p className="text-sm text-gray-600">Template {template}</p>
            </div>
          )}

          <div className="relative overflow-hidden rounded-lg shadow-lg bg-white p-4">
            <div
              className={`${
                isPhone
                  ? 'scale-[0.6] origin-top-left w-[820px] h-[1200px]'
                  : 'scale-[0.45] origin-top-left w-[820px] h-[1200px]'
              } pointer-events-none`}
              style={{
                transformOrigin: 'top left',
                width: isPhone ? '820px' : '820px',
                height: isPhone ? '720px' : '640px'
              }}
              dangerouslySetInnerHTML={{
                __html: injectFormDataIntoTemplate(htmlFiles[template - 1], formData, preview),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
