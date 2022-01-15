<template>
  <div :id="idPrefix + 'vuePdfApp'" :class="[localTheme]" class="pdf-app">
    <script type="application/l10n">
      {{ defaultLocale }}
    </script>
    <div :id="idPrefix + 'outerContainer'">
      <div
        v-show="showElem('sidebar')"
        :class="[isToolbarHidden]"
        :id="idPrefix + 'sidebarContainer'"
      >
        <div v-show="!isSidebarToolbarHidden" :id="idPrefix + 'toolbarSidebar'">
          <slot v-bind="slotProps" name="toolbar-sidebar-prepend"></slot>
          <div class="splitToolbarButton toggled">
            <button
              v-show="showElem('sidebar.viewThumbnail', 'viewThumbnail')"
              :id="idPrefix + 'viewThumbnail'"
              class="toolbarButton toggled vue-pdf-app-icon view-thumbnail"
              title="Show Thumbnails"
              tabindex="2"
              data-l10n-id="thumbs"
            >
              <span data-l10n-id="thumbs_label">Thumbnails</span>
            </button>
            <button
              v-show="showElem('sidebar.viewOutline', 'viewOutline')"
              :id="idPrefix + 'viewOutline'"
              class="toolbarButton vue-pdf-app-icon view-outline"
              title="Show Document Outline (double-click to expand/collapse all items)"
              tabindex="3"
              data-l10n-id="document_outline"
            >
              <span data-l10n-id="document_outline_label"
                >Document Outline</span
              >
            </button>
            <button
              v-show="showElem('sidebar.viewAttachments', 'viewAttachments')"
              :id="idPrefix + 'viewAttachments'"
              class="toolbarButton vue-pdf-app-icon view-attachments"
              title="Show Attachments"
              tabindex="4"
              data-l10n-id="attachments"
            >
              <span data-l10n-id="attachments_label">Attachments</span>
            </button>
          </div>
          <slot v-bind="slotProps" name="toolbar-sidebar-append"></slot>
        </div>
        <div
          v-show="showElem('sidebar')"
          :class="{ 'zero-top': isSidebarToolbarHidden }"
          :id="idPrefix + 'sidebarContent'"
        >
          <div
            v-show="showElem('sidebar.viewThumbnail')"
            :id="idPrefix + 'thumbnailView'"
          ></div>
          <div
            v-show="showElem('sidebar.viewOutline')"
            :id="idPrefix + 'outlineView'"
            class="hidden"
          ></div>
          <div
            v-show="showElem('sidebar.viewAttachments')"
            :id="idPrefix + 'attachmentsView'"
            class="hidden"
          ></div>
        </div>
        <div :id="idPrefix + 'sidebarResizer'" class="hidden"></div>
      </div>
      <!-- sidebarContainer -->

      <div :id="idPrefix + 'mainContainer'">
        <div
          v-show="showElem('toolbar.toolbarViewerLeft.findbar', 'findbar')"
          class="findbar hidden doorHanger"
          :id="idPrefix + 'findbar'"
        >
          <div :id="idPrefix + 'findbarInputContainer'">
            <input
              :id="idPrefix + 'findInput'"
              class="toolbarField"
              title="Find"
              placeholder="Find in document…"
              tabindex="91"
              data-l10n-id="find_input"
            />
            <div class="splitToolbarButton">
              <button
                :id="idPrefix + 'findPrevious'"
                class="toolbarButton findPrevious vue-pdf-app-icon find-previous"
                title="Find the previous occurrence of the phrase"
                tabindex="92"
                data-l10n-id="find_previous"
              >
                <span data-l10n-id="find_previous_label">Previous</span>
              </button>
              <div class="splitToolbarButtonSeparator"></div>
              <button
                :id="idPrefix + 'findNext'"
                class="toolbarButton findNext vue-pdf-app-icon find-next"
                title="Find the next occurrence of the phrase"
                tabindex="93"
                data-l10n-id="find_next"
              >
                <span data-l10n-id="find_next_label">Next</span>
              </button>
            </div>
          </div>

          <div :id="idPrefix + 'findbarOptionsOneContainer'">
            <input
              type="checkbox"
              :id="idPrefix + 'findHighlightAll'"
              class="toolbarField"
              tabindex="94"
            />
            <label
              :for="idPrefix + 'findHighlightAll'"
              class="toolbarLabel"
              data-l10n-id="find_highlight"
              >Highlight all</label
            >
            <input
              type="checkbox"
              :id="idPrefix + 'findMatchCase'"
              class="toolbarField"
              tabindex="95"
            />
            <label
              :for="idPrefix + 'findMatchCase'"
              class="toolbarLabel"
              data-l10n-id="find_match_case_label"
              >Match case</label
            >
          </div>
          <div :id="idPrefix + 'findbarOptionsTwoContainer'">
            <input
              type="checkbox"
              :id="idPrefix + 'findEntireWord'"
              class="toolbarField"
              tabindex="96"
            />
            <label
              :for="idPrefix + 'findEntireWord'"
              class="toolbarLabel"
              data-l10n-id="find_entire_word_label"
              >Whole words</label
            >
            <span :id="idPrefix + 'findResultsCount'" class="toolbarLabel hidden"></span>
          </div>

          <div :id="idPrefix + 'findbarMessageContainer'">
            <span :id="idPrefix + 'findMsg'" class="toolbarLabel"></span>
          </div>
        </div>
        <!-- findbar -->

        <div
          v-show="showElem('secondaryToolbar')"
          :id="idPrefix + 'secondaryToolbar'"
          class="secondaryToolbar hidden doorHangerRight"
        >
          <div :id="idPrefix + 'secondaryToolbarButtonContainer'">
            <slot v-bind="slotProps" name="secondary-toolbar-prepend"></slot>
            <button
              v-show="showElem('secondaryToolbar.secondaryPresentationMode')"
              :id="idPrefix + 'secondaryPresentationMode'"
              class="secondaryToolbarButton presentationMode visibleLargeView vue-pdf-app-icon presentation-mode"
              title="Switch to Presentation Mode"
              tabindex="51"
              data-l10n-id="presentation_mode"
            >
              <span data-l10n-id="presentation_mode_label"
                >Presentation Mode</span
              >
            </button>

            <button
              v-show="showElem('secondaryToolbar.secondaryOpenFile')"
              @click.once="bindOpenHandler"
              :id="idPrefix + 'secondaryOpenFile'"
              class="secondaryToolbarButton openFile visibleLargeView vue-pdf-app-icon open-file"
              title="Open File"
              tabindex="52"
              data-l10n-id="open_file"
            >
              <span data-l10n-id="open_file_label">Open</span>
            </button>

            <button
              v-show="showElem('secondaryToolbar.secondaryPrint')"
              :id="idPrefix + 'secondaryPrint'"
              class="secondaryToolbarButton print visibleMediumView vue-pdf-app-icon print-button"
              title="Print"
              tabindex="53"
              data-l10n-id="print"
            >
              <span data-l10n-id="print_label">Print</span>
            </button>

            <button
              v-show="showElem('secondaryToolbar.secondaryDownload')"
              :id="idPrefix + 'secondaryDownload'"
              class="secondaryToolbarButton download visibleMediumView vue-pdf-app-icon download-button"
              title="Download"
              tabindex="54"
              data-l10n-id="download"
            >
              <span data-l10n-id="download_label">Download</span>
            </button>

            <a
              v-show="showElem('secondaryToolbar.secondaryViewBookmark')"
              href="#"
              :id="idPrefix + 'secondaryViewBookmark'"
              class="secondaryToolbarButton bookmark visibleSmallView vue-pdf-app-icon bookmark-button"
              title="Current view (copy or open in new window)"
              tabindex="55"
              data-l10n-id="bookmark"
            >
              <span data-l10n-id="bookmark_label">Current View</span>
            </a>

            <div
              v-if="
                showElem('secondaryToolbar.secondaryPresentationMode') ||
                showElem('secondaryToolbar.secondaryOpenFile') ||
                showElem('secondaryToolbar.secondaryPrint') ||
                showElem('secondaryToolbar.secondaryDownload') ||
                showElem('secondaryToolbar.secondaryViewBookmark')
              "
              class="horizontalToolbarSeparator visibleLargeView"
            ></div>

            <button
              v-show="showElem('secondaryToolbar.firstPage', 'firstPage')"
              :id="idPrefix + 'firstPage'"
              class="secondaryToolbarButton firstPage vue-pdf-app-icon first-page"
              title="Go to First Page"
              tabindex="56"
              data-l10n-id="first_page"
            >
              <span data-l10n-id="first_page_label">Go to First Page</span>
            </button>
            <button
              v-show="showElem('secondaryToolbar.lastPage', 'lastPage')"
              :id="idPrefix + 'lastPage'"
              class="secondaryToolbarButton lastPage vue-pdf-app-icon last-page"
              title="Go to Last Page"
              tabindex="57"
              data-l10n-id="last_page"
            >
              <span data-l10n-id="last_page_label">Go to Last Page</span>
            </button>

            <div
              v-if="
                showElem('secondaryToolbar.lastPage', 'lastPage') ||
                showElem('secondaryToolbar.firstPage', 'firstPage')
              "
              class="horizontalToolbarSeparator"
            ></div>

            <button
              v-show="showElem('secondaryToolbar.pageRotateCw', 'pageRotateCw')"
              :id="idPrefix + 'pageRotateCw'"
              class="secondaryToolbarButton rotateCw vue-pdf-app-icon rotate-clockwise"
              title="Rotate Clockwise"
              tabindex="58"
              data-l10n-id="page_rotate_cw"
            >
              <span data-l10n-id="page_rotate_cw_label">Rotate Clockwise</span>
            </button>
            <button
              v-show="
                showElem('secondaryToolbar.pageRotateCcw', 'pageRotateCcw')
              "
              :id="idPrefix + 'pageRotateCcw'"
              class="secondaryToolbarButton rotateCcw vue-pdf-app-icon rotate-counter-clockwise"
              title="Rotate Counterclockwise"
              tabindex="59"
              data-l10n-id="page_rotate_ccw"
            >
              <span data-l10n-id="page_rotate_ccw_label"
                >Rotate Counterclockwise</span
              >
            </button>

            <div
              v-if="
                showElem('secondaryToolbar.pageRotateCcw', 'pageRotateCcw') ||
                showElem('secondaryToolbar.pageRotateCw', 'pageRotateCw')
              "
              class="horizontalToolbarSeparator"
            ></div>

            <button
              v-show="
                showElem(
                  'secondaryToolbar.cursorSelectTool',
                  'cursorSelectTool'
                )
              "
              :id="idPrefix + 'cursorSelectTool'"
              class="secondaryToolbarButton selectTool toggled vue-pdf-app-icon select-tool"
              title="Enable Text Selection Tool"
              tabindex="60"
              data-l10n-id="cursor_text_select_tool"
            >
              <span data-l10n-id="cursor_text_select_tool_label"
                >Text Selection Tool</span
              >
            </button>
            <button
              v-show="
                showElem('secondaryToolbar.cursorHandTool', 'cursorHandTool')
              "
              :id="idPrefix + 'cursorHandTool'"
              class="secondaryToolbarButton handTool vue-pdf-app-icon hand-tool"
              title="Enable Hand Tool"
              tabindex="61"
              data-l10n-id="cursor_hand_tool"
            >
              <span data-l10n-id="cursor_hand_tool_label">Hand Tool</span>
            </button>

            <div
              v-if="
                showElem('secondaryToolbar.cursorHandTool', 'cursorHandTool') ||
                showElem(
                  'secondaryToolbar.cursorSelectTool',
                  'cursorSelectTool'
                )
              "
              class="horizontalToolbarSeparator"
            ></div>

            <button
              v-show="
                showElem('secondaryToolbar.scrollVertical', 'scrollVertical')
              "
              :id="idPrefix + 'scrollVertical'"
              class="secondaryToolbarButton scrollModeButtons scrollVertical toggled vue-pdf-app-icon scroll-vertical"
              title="Use Vertical Scrolling"
              tabindex="62"
              data-l10n-id="scroll_vertical"
            >
              <span data-l10n-id="scroll_vertical_label"
                >Vertical Scrolling</span
              >
            </button>
            <button
              v-show="
                showElem(
                  'secondaryToolbar.scrollHorizontal',
                  'scrollHorizontal'
                )
              "
              :id="idPrefix + 'scrollHorizontal'"
              class="secondaryToolbarButton scrollModeButtons scrollHorizontal vue-pdf-app-icon scroll-horizontal"
              title="Use Horizontal Scrolling"
              tabindex="63"
              data-l10n-id="scroll_horizontal"
            >
              <span data-l10n-id="scroll_horizontal_label"
                >Horizontal Scrolling</span
              >
            </button>
            <button
              v-show="
                showElem('secondaryToolbar.scrollWrapped', 'scrollWrapped')
              "
              :id="idPrefix + 'scrollWrapped'"
              class="secondaryToolbarButton scrollModeButtons scrollWrapped vue-pdf-app-icon scroll-wrapped"
              title="Use Wrapped Scrolling"
              tabindex="64"
              data-l10n-id="scroll_wrapped"
            >
              <span data-l10n-id="scroll_wrapped_label">Wrapped Scrolling</span>
            </button>

            <div
              class="horizontalToolbarSeparator scrollModeButtons"
              v-if="
                showElem('secondaryToolbar.scrollWrapped', 'scrollWrapped') ||
                showElem(
                  'secondaryToolbar.scrollHorizontal',
                  'scrollHorizontal'
                ) ||
                showElem('secondaryToolbar.scrollVertical', 'scrollVertical')
              "
            ></div>

            <button
              v-show="showElem('secondaryToolbar.spreadNone', 'spreadNone')"
              :id="idPrefix + 'spreadNone'"
              class="secondaryToolbarButton spreadModeButtons spreadNone toggled vue-pdf-app-icon spread-none"
              title="Do not join page spreads"
              tabindex="65"
              data-l10n-id="spread_none"
            >
              <span data-l10n-id="spread_none_label">No Spreads</span>
            </button>
            <button
              v-show="showElem('secondaryToolbar.spreadOdd', 'spreadOdd')"
              :id="idPrefix + 'spreadOdd'"
              class="secondaryToolbarButton spreadModeButtons vue-pdf-app-icon spread-odd"
              title="Join page spreads starting with odd-numbered pages"
              tabindex="66"
              data-l10n-id="spread_odd"
            >
              <span data-l10n-id="spread_odd_label">Odd Spreads</span>
            </button>
            <button
              v-show="showElem('secondaryToolbar.spreadEven', 'spreadEven')"
              :id="idPrefix + 'spreadEven'"
              class="secondaryToolbarButton spreadModeButtons spreadEven vue-pdf-app-icon spread-even"
              title="Join page spreads starting with even-numbered pages"
              tabindex="67"
              data-l10n-id="spread_even"
            >
              <span data-l10n-id="spread_even_label">Even Spreads</span>
            </button>

            <div
              v-if="
                showElem('secondaryToolbar.spreadEven', 'spreadEven') ||
                showElem('secondaryToolbar.spreadOdd', 'spreadOdd') ||
                showElem('secondaryToolbar.spreadNone', 'spreadNone')
              "
              class="horizontalToolbarSeparator spreadModeButtons"
            ></div>

            <button
              v-show="
                showElem(
                  'secondaryToolbar.documentProperties',
                  'documentProperties'
                )
              "
              :id="idPrefix + 'documentProperties'"
              class="secondaryToolbarButton documentProperties vue-pdf-app-icon document-properties"
              title="Document Properties…"
              tabindex="68"
              data-l10n-id="document_properties"
            >
              <span data-l10n-id="document_properties_label"
                >Document Properties…</span
              >
            </button>
            <slot v-bind="slotProps" name="secondary-toolbar-append"></slot>
          </div>
        </div>
        <!-- secondaryToolbar -->

        <div v-show="showElem('toolbar')" class="toolbar">
          <div :id="idPrefix + 'toolbarContainer'">
            <div :id="idPrefix + 'toolbarViewer'">
              <div :id="idPrefix + 'toolbarViewerLeft'">
                <slot v-bind="slotProps" name="toolbar-left-prepend"></slot>
                <button
                  v-show="showElem('sidebar', 'sidebarToggle')"
                  :id="idPrefix + 'sidebarToggle'"
                  class="toolbarButton vue-pdf-app-icon sidebar-toggle"
                  title="Toggle Sidebar"
                  tabindex="11"
                  data-l10n-id="toggle_sidebar"
                >
                  <span data-l10n-id="toggle_sidebar_label"
                    >Toggle Sidebar</span
                  >
                </button>
                <div
                  v-if="showElem('sidebar')"
                  class="toolbarButtonSpacer"
                ></div>
                <button
                  v-show="
                    showElem(
                      'toolbar.toolbarViewerLeft.findbar',
                      'toggleFindbar'
                    )
                  "
                  :id="idPrefix + 'viewFind'"
                  class="toolbarButton vue-pdf-app-icon view-find"
                  title="Find in Document"
                  tabindex="12"
                  data-l10n-id="findbar"
                >
                  <span data-l10n-id="findbar_label">Find</span>
                </button>
                <div class="splitToolbarButton hiddenSmallView">
                  <button
                    v-show="
                      showElem(
                        'toolbar.toolbarViewerLeft.previous',
                        'previousPage'
                      )
                    "
                    class="toolbarButton pageUp vue-pdf-app-icon page-up"
                    title="Previous Page"
                    :id="idPrefix + 'previous'"
                    tabindex="13"
                    data-l10n-id="previous"
                  >
                    <span data-l10n-id="previous_label">Previous</span>
                  </button>
                  <div
                    v-if="
                      showElem('toolbar.toolbarViewerLeft.next', 'nextPage') &&
                      showElem(
                        'toolbar.toolbarViewerLeft.previous',
                        'previousPage'
                      )
                    "
                    class="splitToolbarButtonSeparator"
                  ></div>
                  <button
                    v-show="
                      showElem('toolbar.toolbarViewerLeft.next', 'nextPage')
                    "
                    class="toolbarButton pageDown vue-pdf-app-icon page-down"
                    title="Next Page"
                    :id="idPrefix + 'next'"
                    tabindex="14"
                    data-l10n-id="next"
                  >
                    <span data-l10n-id="next_label">Next</span>
                  </button>
                </div>
                <input
                  v-show="
                    showElem(
                      'toolbar.toolbarViewerLeft.pageNumber',
                      'pageNumber'
                    )
                  "
                  type="number"
                  :id="idPrefix + 'pageNumber'"
                  class="toolbarField pageNumber"
                  title="Page"
                  value="1"
                  size="4"
                  min="1"
                  tabindex="15"
                  data-l10n-id="page"
                  autocomplete="off"
                />
                <span
                  v-show="
                    showElem('toolbar.toolbarViewerLeft.pageNumber', 'numPages')
                  "
                  :id="idPrefix + 'numPages'"
                  class="toolbarLabel"
                ></span>
                <slot v-bind="slotProps" name="toolbar-left-append"></slot>
              </div>
              <div :id="idPrefix + 'toolbarViewerRight'">
                <slot v-bind="slotProps" name="toolbar-right-prepend"></slot>
                <button
                  v-show="
                    showElem(
                      'toolbar.toolbarViewerRight.presentationMode',
                      'presentationMode'
                    )
                  "
                  :id="idPrefix + 'presentationMode'"
                  class="toolbarButton presentationMode hiddenLargeView vue-pdf-app-icon presentation-mode"
                  title="Switch to Presentation Mode"
                  tabindex="31"
                  data-l10n-id="presentation_mode"
                >
                  <span data-l10n-id="presentation_mode_label"
                    >Presentation Mode</span
                  >
                </button>

                <button
                  v-show="
                    showElem('toolbar.toolbarViewerRight.openFile', 'openFile')
                  "
                  @click.once="bindOpenHandler"
                  :id="idPrefix + 'openFile'"
                  class="toolbarButton openFile hiddenLargeView vue-pdf-app-icon open-file"
                  title="Open File"
                  tabindex="32"
                  data-l10n-id="open_file"
                >
                  <span data-l10n-id="open_file_label">Open</span>
                </button>

                <button
                  v-show="showElem('toolbar.toolbarViewerRight.print', 'print')"
                  :id="idPrefix + 'print'"
                  class="toolbarButton print hiddenMediumView vue-pdf-app-icon print-button"
                  title="Print"
                  tabindex="33"
                  data-l10n-id="print"
                >
                  <span data-l10n-id="print_label">Print</span>
                </button>

                <button
                  v-show="
                    showElem('toolbar.toolbarViewerRight.download', 'download')
                  "
                  :id="idPrefix + 'download'"
                  class="toolbarButton download hiddenMediumView vue-pdf-app-icon download-button"
                  title="Download"
                  tabindex="34"
                  data-l10n-id="download"
                >
                  <span data-l10n-id="download_label">Download</span>
                </button>
                <a
                  v-show="
                    showElem(
                      'toolbar.toolbarViewerRight.viewBookmark',
                      'viewBookmark'
                    )
                  "
                  href="#"
                  :id="idPrefix + 'viewBookmark'"
                  class="toolbarButton bookmark hiddenSmallView vue-pdf-app-icon bookmark-button"
                  title="Current view (copy or open in new window)"
                  tabindex="35"
                  data-l10n-id="bookmark"
                >
                  <span data-l10n-id="bookmark_label">Current View</span>
                </a>
                <div
                  v-if="showElem('secondaryToolbar')"
                  class="verticalToolbarSeparator hiddenSmallView"
                ></div>

                <button
                  v-show="showElem('secondaryToolbar')"
                  :id="idPrefix + 'secondaryToolbarToggle'"
                  class="toolbarButton vue-pdf-app-icon secondary-toolbar-toggle"
                  title="Tools"
                  tabindex="36"
                  data-l10n-id="tools"
                >
                  <span data-l10n-id="tools_label">Tools</span>
                </button>
                <slot v-bind="slotProps" name="toolbar-right-append"></slot>
              </div>
              <div :id="idPrefix + 'toolbarViewerMiddle'">
                <slot v-bind="slotProps" name="toolbar-middle-prepend"></slot>
                <div class="splitToolbarButton">
                  <button
                    v-show="
                      showElem('toolbar.toolbarViewerMiddle.zoomOut', 'zoomOut')
                    "
                    :id="idPrefix + 'zoomOut'"
                    class="toolbarButton zoomOut vue-pdf-app-icon zoom-out"
                    title="Zoom Out"
                    tabindex="21"
                    data-l10n-id="zoom_out"
                  >
                    <span data-l10n-id="zoom_out_label">Zoom Out</span>
                  </button>
                  <div
                    v-if="
                      showElem(
                        'toolbar.toolbarViewerMiddle.zoomIn',
                        'zoomIn'
                      ) &&
                      showElem('toolbar.toolbarViewerMiddle.zoomOut', 'zoomOut')
                    "
                    class="splitToolbarButtonSeparator"
                  ></div>
                  <button
                    v-show="
                      showElem('toolbar.toolbarViewerMiddle.zoomIn', 'zoomIn')
                    "
                    :id="idPrefix + 'zoomIn'"
                    class="toolbarButton zoomIn vue-pdf-app-icon zoom-in"
                    title="Zoom In"
                    tabindex="22"
                    data-l10n-id="zoom_in"
                  >
                    <span data-l10n-id="zoom_in_label">Zoom In</span>
                  </button>
                </div>
                <span
                  v-show="
                    showElem('toolbar.toolbarViewerMiddle.scaleSelectContainer')
                  "
                  :id="idPrefix + 'scaleSelectContainer'"
                  class="dropdownToolbarButton vue-pdf-app-icon dropdown-toolbar-button"
                >
                  <select
                    :id="idPrefix + 'scaleSelect'"
                    title="Zoom"
                    tabindex="23"
                    data-l10n-id="zoom"
                  >
                    <option
                      :id="idPrefix + 'pageAutoOption'"
                      title
                      value="auto"
                      selected="selected"
                      data-l10n-id="page_scale_auto"
                    >
                      Automatic Zoom
                    </option>
                    <option
                      :id="idPrefix + 'pageActualOption'"
                      title
                      value="page-actual"
                      data-l10n-id="page_scale_actual"
                    >
                      Actual Size
                    </option>
                    <option
                      :id="idPrefix + 'pageFitOption'"
                      title
                      value="page-fit"
                      data-l10n-id="page_scale_fit"
                    >
                      Page Fit
                    </option>
                    <option
                      :id="idPrefix + 'pageWidthOption'"
                      title
                      value="page-width"
                      data-l10n-id="page_scale_width"
                    >
                      Page Width
                    </option>
                    <option
                      :id="idPrefix + 'customScaleOption'"
                      title
                      value="custom"
                      disabled="disabled"
                      hidden="true"
                    ></option>
                    <option
                      :data-l10n-args="getScale(50)"
                      value="0.5"
                      data-l10n-id="page_scale_percent"
                      title
                    >
                      50%
                    </option>
                    <option
                      :data-l10n-args="getScale(75)"
                      value="0.75"
                      data-l10n-id="page_scale_percent"
                      title
                    >
                      75%
                    </option>
                    <option
                      :data-l10n-args="getScale(100)"
                      value="1"
                      data-l10n-id="page_scale_percent"
                      title
                    >
                      100%
                    </option>
                    <option
                      :data-l10n-args="getScale(125)"
                      value="1.25"
                      data-l10n-id="page_scale_percent"
                      title
                    >
                      125%
                    </option>
                    <option
                      :data-l10n-args="getScale(150)"
                      value="1.5"
                      data-l10n-id="page_scale_percent"
                      title
                    >
                      150%
                    </option>
                    <option
                      :data-l10n-args="getScale(200)"
                      value="2"
                      data-l10n-id="page_scale_percent"
                      title
                    >
                      200%
                    </option>
                    <option
                      :data-l10n-args="getScale(300)"
                      value="3"
                      data-l10n-id="page_scale_percent"
                      title
                    >
                      300%
                    </option>
                    <option
                      :data-l10n-args="getScale(400)"
                      value="4"
                      data-l10n-id="page_scale_percent"
                      title
                    >
                      400%
                    </option>
                  </select>
                </span>
                <slot v-bind="slotProps" name="toolbar-middle-append"></slot>
              </div>
            </div>
          </div>
        </div>
        <div :id="idPrefix + 'loadingBar'">
          <div class="progress">
            <div class="glimmer"></div>
          </div>
        </div>
        <menu v-show="false" type="context" :id="idPrefix + 'viewerContextMenu'">
          <menuitem
            :id="idPrefix + 'contextFirstPage'"
            label="First Page"
            data-l10n-id="first_page"
          />
          <menuitem
            :id="idPrefix + 'contextLastPage'"
            label="Last Page"
            data-l10n-id="last_page"
          />
          <menuitem
            :id="idPrefix + 'contextPageRotateCw'"
            label="Rotate Clockwise"
            data-l10n-id="page_rotate_cw"
          />
          <menuitem
            :id="idPrefix + 'contextPageRotateCcw'"
            label="Rotate Counter-Clockwise"
            data-l10n-id="page_rotate_ccw"
          />
        </menu>
        <slot v-bind="slotProps" name="viewer-header"></slot>
        <slot v-bind="slotProps" name="viewer-prepend"></slot>
        <div :id="idPrefix + 'viewerContainer'" :class="[isToolbarHidden]" tabindex="0">
          <div :id="idPrefix + 'viewer'" class="pdfViewer"></div>
        </div>
        <slot v-bind="slotProps" name="viewer-append"></slot>
        <slot v-bind="slotProps" name="viewer-footer"></slot>

        <div v-show="showElem('errorWrapper')" :id="idPrefix + 'errorWrapper'" hidden="true">
          <div :id="idPrefix + 'errorMessageLeft'">
            <span :id="idPrefix + 'errorMessage'"></span>
            <button :id="idPrefix + 'errorShowMore'" data-l10n-id="error_more_info">
              More Information
            </button>
            <button
              :id="idPrefix + 'errorShowLess'"
              data-l10n-id="error_less_info"
              hidden="true"
            >
              Less Information
            </button>
          </div>
          <div :id="idPrefix + 'errorMessageRight'">
            <button :id="idPrefix + 'errorClose'" data-l10n-id="error_close">Close</button>
          </div>
          <div class="clearBoth"></div>
          <textarea
            :id="idPrefix + 'errorMoreInfo'"
            hidden="true"
            readonly="readonly"
          ></textarea>
        </div>
      </div>
      <!-- mainContainer -->

      <div :id="idPrefix + 'overlayContainer'" class="hidden">
        <div :id="idPrefix + 'passwordOverlay'" class="container hidden">
          <div class="dialog">
            <div class="row">
              <p :id="idPrefix + 'passwordText'" data-l10n-id="password_label">
                Enter the password to open this PDF file:
              </p>
            </div>
            <div class="row">
              <input type="password" :id="idPrefix + 'password'" class="toolbarField" />
            </div>
            <div class="buttonRow">
              <button :id="idPrefix + 'passwordCancel'" class="overlayButton">
                <span data-l10n-id="password_cancel">Cancel</span>
              </button>
              <button :id="idPrefix + 'passwordSubmit'" class="overlayButton">
                <span data-l10n-id="password_ok">OK</span>
              </button>
            </div>
          </div>
        </div>
        <div :id="idPrefix + 'documentPropertiesOverlay'" class="container hidden">
          <div class="dialog">
            <div class="row">
              <span data-l10n-id="document_properties_file_name"
                >File name:</span
              >
              <p :id="idPrefix + 'fileNameField'">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_file_size"
                >File size:</span
              >
              <p :id="idPrefix + 'fileSizeField'">-</p>
            </div>
            <div class="separator"></div>
            <div class="row">
              <span data-l10n-id="document_properties_title">Title:</span>
              <p :id="idPrefix + 'titleField'">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_author">Author:</span>
              <p :id="idPrefix + 'authorField'">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_subject">Subject:</span>
              <p :id="idPrefix + 'subjectField'">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_keywords">Keywords:</span>
              <p :id="idPrefix + 'keywordsField'">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_creation_date"
                >Creation Date:</span
              >
              <p :id="idPrefix + 'creationDateField'">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_modification_date"
                >Modification Date:</span
              >
              <p :id="idPrefix + 'modificationDateField'">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_creator">Creator:</span>
              <p :id="idPrefix + 'creatorField'">-</p>
            </div>
            <div class="separator"></div>
            <div class="row">
              <span data-l10n-id="document_properties_producer"
                >PDF Producer:</span
              >
              <p :id="idPrefix + 'producerField'">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_version"
                >PDF Version:</span
              >
              <p :id="idPrefix + 'versionField'">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_page_count"
                >Page Count:</span
              >
              <p :id="idPrefix + 'pageCountField'">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_page_size"
                >Page Size:</span
              >
              <p :id="idPrefix + 'pageSizeField'">-</p>
            </div>
            <div class="separator"></div>
            <div class="row">
              <span data-l10n-id="document_properties_linearized"
                >Fast Web View:</span
              >
              <p :id="idPrefix + 'linearizedField'">-</p>
            </div>
            <div class="buttonRow">
              <button :id="idPrefix + 'documentPropertiesClose'" class="overlayButton">
                <span data-l10n-id="document_properties_close">Close</span>
              </button>
            </div>
          </div>
        </div>
        <!--#if !MOZCENTRAL-->
        <div :id="idPrefix + 'printServiceOverlay'" class="container hidden">
          <div class="dialog">
            <div class="row">
              <span data-l10n-id="print_progress_message"
                >Preparing document for printing…</span
              >
            </div>
            <div class="row">
              <progress value="0" max="100"></progress>
              <span
                data-l10n-id="print_progress_percent"
                data-l10n-args='{ "progress": 0 }'
                class="relative-progress"
                >0%</span
              >
            </div>
            <div class="buttonRow">
              <button :id="idPrefix + 'printCancel'" class="overlayButton">
                <span data-l10n-id="print_progress_close">Cancel</span>
              </button>
            </div>
          </div>
        </div>
        <!--#endif-->
        <!--#if CHROME-->
        <!--#include viewer-snippet-chrome-overlays.html-->
        <!--#endif-->
      </div>
      <!-- overlayContainer -->
    </div>
    <!-- outerContainer -->
    <slot v-bind="slotProps" name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import "@/pdfjs-dist/es5/build/pdf";
// FIX typings
// @ts-ignore
import * as pdfApp from "@/pdfjs-dist/lib/web/app";
// @ts-ignore
import { AppOptions } from "@/pdfjs-dist/lib/web/app_options";
import "@/pdfjs-dist/lib/web/genericcom";
import "@/pdfjs-dist/lib/web/pdf_print_service";
import "@/pdfjs-dist/build/pdf.worker.entry";
import "@/sass/index.scss";
import { ToolbarConfig, Theme, ToolbarIdConfig, PageScale } from "@/types";
import getAppConfig from "@/utils/pdf-config";
import { PDF_FILE_INPUT_ID } from "@/utils/constants";
import locale from "@/utils/locale";
import { getToolbarConfigValue, toolbarConfig } from "@/utils/toolbar-config";

if (AppOptions) {
  AppOptions.set("defaultUrl", null);
}

const themeCacheKey = "vue-pdf-app-theme";
const errorHandler = console.error.bind(console);

// pdf_print_service reassigns window.print.
// Assign original window.print on component destroy.
// Once pdf is opened again assign window.print = pdfjs.print
const pdfPrint = window.print.bind(window);
window.print = (window as any).__nativePrint__ || pdfPrint;

@Component
export default class PdfViewer extends Vue {
  @Prop({ required: false, default: () => toolbarConfig, type: Object })
  readonly config!: ToolbarConfig;

  @Prop({ required: false, type: Boolean, default: () => false })
  readonly title!: boolean;

  // can accept string URL
  @Prop({ required: false, type: [String, ArrayBuffer] })
  readonly pdf?: string | ArrayBuffer;

  @Prop({ required: false, type: String })
  readonly theme?: Theme;

  @Prop({ required: false, type: String })
  readonly fileName?: string;

  @Prop({ required: false, type: Object })
  readonly idConfig?: ToolbarIdConfig;

  @Prop({ required: false, type: [Number, String] })
  readonly pageScale?: PageScale;

  @Prop({ required: false, type: Number })
  readonly pageNumber?: number;

  private defaultLocale = JSON.stringify(locale);

  private isOpenHandlerBinded = false;

  private isSidebarHidden = true;

  private isFindbarHidden = true;

  private cacheTheme = window.localStorage.getItem(
    themeCacheKey
  ) as Theme | null;

  private idPrefix = this.makeId(6) + '-';

  private get isSidebarToolbarHidden() {
    const isCustomToolbar =
      this.idConfig?.viewAttachments &&
      this.idConfig?.viewOutline &&
      this.idConfig?.viewThumbnail;

    return isCustomToolbar || !this.config.sidebar;
  }

  private get isToolbarHidden() {
    if (this.config.toolbar === false) return "zero-top";
    return "";
  }

  private get localTheme(): Theme {
    if (this.theme) return this.theme;

    if (this.cacheTheme) return this.cacheTheme;

    const prefersTheme = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("content")
      .replace(/"/g, "") as Theme;
    if (["light", "dark"].includes(prefersTheme)) return prefersTheme;

    return "dark";
  }

  private get slotProps() {
    return {
      toggleTheme: this.toggleTheme,
      isSidebarHidden: this.isSidebarHidden,
      isFindbarHidden: this.isFindbarHidden,
    };
  }

  private beforeDestroy() {
    this.destroyPdf();
  }

  private created() {
    window.print = pdfPrint;
    pdfApp.PDFViewerApplication.isViewerEmbedded = !this.title;
    this.$emit("after-created", pdfApp.PDFViewerApplication);
  }

  private mounted() {
    this.addPrintContainer();
    const config = getAppConfig(this.idConfig, this.idPrefix);
    console.log(config);

    if (pdfApp.PDFViewerApplication) {
      pdfApp.PDFViewerApplication.run(config);
      pdfApp.PDFViewerApplication.initializedPromise
        .then(this.setDefaultPageScale.bind(this))
        .then(this.open.bind(this))
        .then(this.bindSidebarToggleEvents.bind(this))
        .then(this.bindFindbarToggleEvents.bind(this))
        .catch(errorHandler);
    }
  }

  private bindSidebarToggleEvents() {
    const config = getAppConfig(this.idConfig, this.idPrefix);
    const toggleButton = config.sidebar.toggleButton;
    const handler = this.checkSidebarVisibility.bind(this);

    toggleButton?.addEventListener("click", handler);
    this.$once("hook:beforeDestroy", () => {
      toggleButton?.removeEventListener("click", handler);
    });
  }

  private bindFindbarToggleEvents() {
    const config = getAppConfig(this.idConfig, this.idPrefix);
    const toggleButton = config.findBar.toggleButton;
    const handler = this.checkFindbarVisibility.bind(this);

    toggleButton?.addEventListener("click", handler);
    this.$once("hook:beforeDestroy", () => {
      toggleButton?.removeEventListener("click", handler);
    });
  }

  private bindOpenHandler() {
    if (this.isOpenHandlerBinded) return;

    const fileInput = document.getElementById(this.idPrefix + PDF_FILE_INPUT_ID);
    const fileInputHandler = async () => {
      // @ts-ignore
      await pdfApp.PDFViewerApplication.pdfLoadingTask?.promise;
      this.openDocument();
    };

    fileInput?.addEventListener("change", fileInputHandler);
    this.$once("hook:beforeDestroy", () => {
      fileInput?.removeEventListener("change", fileInputHandler);
    });

    this.isOpenHandlerBinded = true;
  }

  private open() {
    this.clearCacheTimeout();
    if (!pdfApp.PDFViewerApplication) return;

    if (!this.pdf) {
      pdfApp.PDFViewerApplication.close();
    } else {
      pdfApp.PDFViewerApplication.open(this.pdf)
        .then(() => {
          // @ts-ignore
          return pdfApp.PDFViewerApplication.pdfDocument?.getMetadata();
        })
        .then((fileMetadata: { contentDispositionFilename: null | string }) => {
          // @ts-ignore
          pdfApp.PDFViewerApplication.contentDispositionFilename =
            this.fileName || fileMetadata.contentDispositionFilename;
        })
        .then(this.openDocument.bind(this))
        .catch(errorHandler);
    }
  }

  private async openDocument() {
    this.resetLoadingBar();
    this.$emit("open", pdfApp.PDFViewerApplication);

    // @ts-ignore
    if (pdfApp.PDFViewerApplication?.pdfViewer?.pagesPromise) {
      // @ts-ignore
      await pdfApp.PDFViewerApplication.pdfViewer.pagesPromise.catch(
        errorHandler
      );

      if (this.pageNumber) {
        setTimeout(() => (pdfApp.PDFViewerApplication.page = this.pageNumber));
      }

      this.checkSidebarVisibility();
      this.checkFindbarVisibility();
      this.$emit("pages-rendered", pdfApp.PDFViewerApplication);
    }
  }

  private checkSidebarVisibility() {
    const sidebar = pdfApp.PDFViewerApplication?.pdfSidebar;
    // @ts-ignore
    this.isSidebarHidden = !(sidebar && sidebar.isOpen);
  }

  private checkFindbarVisibility() {
    // @ts-ignore
    const findbar = pdfApp.PDFViewerApplication?.findBar;
    this.isFindbarHidden = !(findbar && findbar.opened);
  }

  private addPrintContainer() {
    const printElId = "printContainer";
    const el = document.createElement("div");
    el.id = printElId;
    document.body.appendChild(el);

    const styleEl = document.createElement("style");
    styleEl.type = "text/css";
    styleEl.innerHTML = `
        @media print {
          body > *:not(#printContainer) {
            display: none !important;
        }
      }`;
    document.head.appendChild(styleEl);

    this.$once("hook:beforeDestroy", () => {
      document.body.removeChild(el);
      document.head.removeChild(styleEl);
    });
  }

  private destroyPdf(): void {
    this.clearCacheTimeout();
    pdfApp.PDFViewerApplication.unbindEvents();
    pdfApp.PDFViewerApplication.unbindWindowEvents();

    // @ts-ignore
    pdfApp.PDFViewerApplication.pdfDocument?.destroy();

    const el = document.getElementById(this.idPrefix + PDF_FILE_INPUT_ID);
    el && el.remove();

    // __nativePrint__ is assigned in pdf_print_service.js
    window.print = (window as any).__nativePrint__ || window.print;
  }

  private toggleTheme() {
    const newTheme = this.localTheme === "dark" ? "light" : "dark";
    this.$emit("update:theme", newTheme);
    this.cacheTheme = newTheme;
    window.localStorage.setItem(themeCacheKey, newTheme);
  }

  private clearCacheTimeout() {
    const cacheTimeoutId =
      // @ts-ignore
      pdfApp.PDFViewerApplication.pdfRenderingQueue?.idleTimeout;
    clearTimeout(cacheTimeoutId);
  }

  private getScale(value: number): string {
    return `{ "scale": ${value} }`;
  }

  private showElem(
    defaultToolbarPath: string,
    customToolbarElem?: keyof ToolbarIdConfig
  ): boolean {
    if (customToolbarElem && this.idConfig) {
      return !this.idConfig[customToolbarElem];
    }

    return !(getToolbarConfigValue(this.config, defaultToolbarPath) === false);
  }

  private setDefaultPageScale() {
    this.pageScale && AppOptions.set("defaultZoomValue", this.pageScale);
  }

  private resetLoadingBar() {
    pdfApp.PDFViewerApplication.loadingBar.show();
    pdfApp.PDFViewerApplication.loadingBar.percent = 0;
  }

  @Watch("pdf")
  private pdfChangeHandler() {
    this.open();
  }

  private makeId(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
          charactersLength));
    }
    return result;
  }
}
</script>

<style>
html {
  content: "";
}

@media (prefers-color-scheme: light) {
  html {
    content: "light";
  }
}

@media (prefers-color-scheme: dark) {
  html {
    content: "dark";
  }
}
</style>

<style lang="scss" scoped>
#sidebarContent.zero-top,
#sidebarContainer.zero-top,
#viewerContainer.zero-top {
  top: 0;
}
</style>