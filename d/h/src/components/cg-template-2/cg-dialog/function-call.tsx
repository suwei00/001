import { mountComponent } from '@/utils/mount-component';
import { Component, type ComponentPublicInstance } from 'vue';
import router from '@/router/cg-template-2';
import { NoticeBar as VanNoticeBar } from 'vant';
import {
  CgButton,
  CgIcon,
  CgContainer,
  CgContainerHead
} from '@/components/cg-template-2';
import CgDialog from './index';
import Tmp1 from './tmp1';
import Tmp2 from './tmp2';
import Tmp3 from './tmp3';

import './temp.scss';

// eslint-disable-next-line
export type ComponentInstance = ComponentPublicInstance<{}, any>;

type DialogTemplate = 'tmp1' | 'tmp2' | 'tmp3';
interface ShowDialogOptions {
  template: DialogTemplate; // 【模板1 包含标题、按钮、内容是纯文字】【模板2 包含标题、按钮，中间内容自定义】【模板3 空弹窗】
  tmp1Content?: string; // 模板1时传文字内容
  customComponent?: Component; // 自定义组件内容
  props?: { [text: string]: any }; // props
  closeOnClickOverlay?: boolean; // 是否在点击遮罩层后关闭 默认开启
  showOverlay?: boolean // 是否显示遮罩层
  title?: string; // 标题
  redTitle?: string; // 紧急站内信红标题
  btns?: 0 | 1 | 2; // 展示按钮数量
  confirmText?: string; // 确认文字
  cancelText?: string; // 取消文字
  footerText?: string; // 底部文案
  footerButSizi?: boolean; // 底部按钮大小
  onOk?: () => void; // 确认回调
  onCancel?: () => void; // 取消回调
}

let unmount: () => void;

// 导出class，可以同时存在多个
export class CgDialogClass {
  instance: ComponentInstance | undefined | null;

  constructor() { }

  unmount() {
    if (this.instance) {
      unmount();
      this.instance = null;
    }
  }

  initInstance(options: ShowDialogOptions) {
    const {
      template,
      tmp1Content,
      customComponent,
      props,
      closeOnClickOverlay,
      showOverlay,
      title = 'Lưu Ý',
      redTitle,
      btns = 2,
      confirmText = 'Xác nhận',
      cancelText = 'HỦY BỎ',
      onOk,
      onCancel,
      footerText,
      footerButSizi,
    } = options;
    const _this = this;
    const Wrapper = {
      setup() {
        const _unmount = () => {
          _this.unmount();
          _this.instance = null;
        };

        // 确认
        const okHandler = () => {
          onOk && onOk();
          _unmount();
        };
        // 取消
        const cancelHandler = () => {
          onCancel && onCancel();
          _unmount();
        };

        const okKefu = () => {
          cancelHandler()
          router.push('/forget-password');
        };

        return () => (
          <>
            <CgDialog closeOnClickOverlay={closeOnClickOverlay} onClosed={_unmount} showOverlay={showOverlay}>
              {
                // 模板3 仅提供空插槽
                template === 'tmp3' ? (
                  <Tmp3
                    v-slots={{
                      default: () => {
                        return <customComponent {...props} />;
                      }
                    }}
                  ></Tmp3>
                ) : (
                  <CgContainer border='0' radius='16' width='540' isShadow={false}>
                    <CgContainerHead
                      height='80'
                      v-slots={{
                        center: () => {
                          return redTitle ? (
                            <div class='cg-dialog-temp-header-red-title'>
                              {redTitle.length <= 15 ? (
                                <>
                                  <CgIcon
                                    class='cg-dialog-temp-header-red-title-icon'
                                    name='i_path'
                                  />
                                  <span>{redTitle}</span>
                                </>
                              ) : (
                                <VanNoticeBar
                                  class='cg-dialog-temp-header-notice-bar'
                                  background='transparent'
                                  scrollable={true}
                                  v-slots={{
                                    default: () => {
                                      return (
                                        <p class='cg-dialog-temp-header-notice-bar-content'>
                                          <CgIcon
                                            class='cg-dialog-temp-header-red-title-icon'
                                            name='i_path'
                                          />
                                          {redTitle}
                                        </p>
                                      );
                                    }
                                  }}
                                ></VanNoticeBar>
                              )}
                              {/* <CgIcon
                                class='cg-dialog-temp-header-red-title-close'
                                name='i_grey_close'
                                onClick={_unmount}
                              /> */}
                            </div>
                          ) : title ? (
                            <span class='cg-dialog-temp-header-title'>{title}</span>
                          ) : null;
                        }
                      }}
                    ></CgContainerHead>

                    {/* 内容区 */}
                    <div class='cg-dialog-temp-wrapper'>
                      {/* 模板1 */}
                      {template === 'tmp1' ? <Tmp1 content={tmp1Content} /> : null}

                      {/* 模板2 */}
                      {template === 'tmp2' ? (
                        <Tmp2
                          v-slots={{
                            default: () => {
                              return <customComponent {...props} />;
                            }
                          }}
                        ></Tmp2>
                      ) : null}

                      {/* 按钮 */}
                      {btns > 0 ? (
                        <div class='cg-dialog-temp-btn-wrapper'>
                          {btns === 2 ? (
                            <CgButton
                              style='margin-right: var(--cg-px-24);'
                              whiteStyle
                              small
                              onClick={cancelHandler}
                            >
                              {cancelText}
                            </CgButton>
                          ) : null}
                          <CgButton big={footerButSizi} small onClick={okHandler}>
                            {confirmText}
                          </CgButton>
                        </div>
                      ) : null}
                      {footerText ? <div onClick={okKefu} class='footer_text'>{footerText} </div> : null}
                    </div>
                  </CgContainer>
                )
              }
            </CgDialog>
          </>
        );
      }
    };

    const { instance: i, unmount: u } = mountComponent(Wrapper);
    _this.instance = i;
    _this.unmount = u;
  }

  showDialog(options: ShowDialogOptions) {
    return new Promise((resolve, reject) => {
      this.closeDialog();
      if (!this.instance) {
        this.initInstance(options);
      }
    });
  }

  closeDialog() {
    if (this.instance) {
      this.unmount();
      this.instance = null;
    }
  }
}
